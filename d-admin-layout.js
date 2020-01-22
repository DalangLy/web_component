class DAdminLayout extends HTMLElement{
    constructor(){
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
    }

    connectedCallback(){
        let sidebarWidthFull = 280,
            sideBarWidthCollapsed = 70,
            borderColor = '1px solid rgba(0,0,0,.0625)',
            adminBackgroundColor = '#f9fafb',
            defaultTextColor = '#757575',
            headerHeight = 60;
        const template = `
            <style>
                @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css'); /* you must link this link in index.html also */
                *{
                    box-sizing: border-box;
                    padding: 0;
                    margin: 0;
                    color: `+defaultTextColor+`;
                }
                ul{
                    padding: 0;
                    margin: 0;
                    list-style: none;
                }


                /*start page container style*/
                .page-container{
                    padding-left: `+sidebarWidthFull+`px;
                    width: 100%;
                    transition: all 0.3s ease;
                    -webkit-transition: all 0.3s ease;
                    -o-transition: all 0.3s ease;
                }
                .page-container.collapsed{
                    padding-left: `+sideBarWidthCollapsed+`px;
                }
                /*end page container style*/


                /*start header style*/
                .header{
                    position: fixed;
                    right: 0;
                    top: 0;
                    left: 0;
                    height: `+headerHeight+`px;
                    border-bottom: `+borderColor+`;
                    transition: all 0.3s ease;
                    -webkit-transition: all 0.3s ease;
                    -o-transition: all 0.3s ease;
                    background-color: #fff;
                    padding-left: `+sidebarWidthFull+`px; <* use padding over margin because it not affect width *>
                }
                .header.collapsed{
                    padding-left: `+sideBarWidthCollapsed+`px;
                }
                .header-container{
                    height: 100%;
                    clear: both;
                    content: "";
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                
                .nav-left{
                    float: left;
                    margin-left: 10px;
                }
                .nav-right{
                    float: right;
                    margin-right: 10px;
                }
                /*end header style*/


                /*start side bar style*/
                .sidebar{
                    width: `+sidebarWidthFull+`px;
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    top: 0;
                    background-color: #fff;
                    z-index: 1000;
                    border-right: `+borderColor+`;
                    transition: all 0.3s ease;
                    -webkit-transition: all 0.3s ease;
                    -o-transition: all 0.3s ease;
                }
                .sidebar.collapsed{
                    width: `+sideBarWidthCollapsed+`px;
                }
                /*end side bar style*/


                /*start main content style*/
                .main-content{
                    background-color: `+adminBackgroundColor+`;
                    height: 100vh;
                    padding: 10px;
                    margin-top: `+headerHeight+`px; /* to avoid hide content behind header */
                }
                /*end main content style*/


                /*start footer style*/
                footer{
                    height: 70px;
                    width: 100%;
                    background-color: #fff;
                    border-top: `+borderColor+`;
                }
                .footer-content{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                /*end footer style*/

                /* start sidebar toggle button style */
                .sidebar-toggle{
                    border: none;
                    background: none;
                    outline: none;
                    cursor: pointer;
                    font-size: 20px;
                }
                /* end sidebar toggle button style */

                /* start user avatar style*/
                .user-avatar{
                    width: 40px;
                    height: 40px;
                    background-color: #fff;
                    border-radius: 50%;
                    border: 2px solid cyan;
                    cursor: pointer;
                    overflow: hidden;
                }
                .user-avatar img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    verticle-align: middle;
                }
                /* start user avatar style*/
            </style>
            <div>

                <!--start sidebar-->
                <div class="sidebar">

                </div>
                <!--end sidebar-->

                <!--start page container-->
                <div class="page-container">

                    <!--start header-->
                    <div class="header">
                        <div class="header-container">
                            <ul class="nav-left">

                                <!-- start sidebar toggle button -->
                                <button class="sidebar-toggle"><i class="fas fa-bars"></i></button>
                                <!-- end sidebar toggle button -->

                            </ul>
                            <ul class="nav-right">

                                <!-- start user avatar -->
                                <div class="user-avatar">
                                    <img src="https://www.biography.com/.image/t_share/MTE5NTU2MzE2NTE5MzAyNjY3/elizabeth-olsen-20631899-1-402.jpg">
                                </div>
                                <!-- end user avatar -->

                            </ul>
                        </div>
                    </div>
                    <!--end header-->

                    <!--start main-->
                    <main class="main-content">
                        <div>
                            <slot name="mainContent"></slot>
                        </div>
                    </main>
                    <!--end main-->

                    <!--start footer-->
                    <footer>
                        <div class="footer-content">Copyright © 2017 Designed by Dalang. All rights reserved.</div>
                    </footer>
                    <!--end footer-->

                </div>
                <!--end page container-->

            </div>
        `;
        this.shadow.innerHTML = template;
        this.setUpEvents();
    }

    setUpEvents(){
        this.shadow.querySelector('.sidebar-toggle').onclick = e => this.toggleSidebarOnClick(e);
    }

    isSidebarOpen = true;
    
    toggleSidebarOnClick(e){
        const header = this.shadow.querySelector('.header');
        const sidebar = this.shadow.querySelector('.sidebar');
        const pageContainer = this.shadow.querySelector('.page-container');

        if(this.isSidebarOpen){
            //close
            header.classList.add('collapsed');
            sidebar.classList.add('collapsed');
            pageContainer.classList.add('collapsed');
        }
        else{
            //open
            header.classList.remove('collapsed');
            sidebar.classList.remove('collapsed');
            pageContainer.classList.remove('collapsed');
        }
        this.isSidebarOpen = !this.isSidebarOpen;
    }
}
window.customElements.define('d-admin-layout', DAdminLayout);
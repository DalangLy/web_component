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
                    overflow: hidden;
                }
                .sidebar.collapsed{
                    width: `+sideBarWidthCollapsed+`px;
                }
                .sidebar-inner{
                    width: `+sidebarWidthFull+`px;
                    height: 100%;
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


                /*start side bar logo style*/
                .sidebar-logo{
                    width: 100%;
                    height: `+headerHeight+`px;
                    padding: 10px 5%; /* use percentage to get better sidebar collapsed style */
                    border-bottom: `+borderColor+`;
                    display: flex;
                    justify-content: start;
                    align-items: center;
                    cursor: pointer;
                    -webkit-user-select: none; /* Safari 3.1+ */
                    -moz-user-select: none; /* Firefox 2+ */
                    -ms-user-select: none; /* IE 10+ */
                    user-select: none; /* Standard syntax */
                }
                .peers{
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    transition: all 0.3s ease;
                    -webkit-transition: all 0.3s ease;
                    -o-transition: all 0.3s ease;
                }
                .sidebar-logo-image{
                    width: 40px;
                    height: 40px;
                    transition: all 0.3s ease;
                    -webkit-transition: all 0.3s ease;
                    -o-transition: all 0.3s ease;
                }
                .sidebar-logo-image img{
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    verticle-align: middle;
                    transition: all 0.3s ease;
                    -webkit-transition: all 0.3s ease;
                    -o-transition: all 0.3s ease;
                }
                .sidebar-logo-title{
                    font-size: 20px;
                    margin-left: 20px;
                    display: block;
                    transition: all 0.3s ease;
                    -webkit-transition: all 0.3s ease;
                    -o-transition: all 0.3s ease;
                    opacity: 1;
                }
                .sidebar-logo-title.collapsed{
                    opacity: 0;
                }
                /*end side bar logo style*/


                /* start right nav user avatar and name container style */
                .user-avatar-and-name-container{
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    cursor: pointer;
                    -webkit-user-select: none; /* Safari 3.1+ */
                    -moz-user-select: none; /* Firefox 2+ */
                    -ms-user-select: none; /* IE 10+ */
                    user-select: none; /* Standard syntax */
                }
                .user-avatar-and-name-container .username{
                    margin-left: 5px;
                }
                /* end right nav user avatar and name container style */

                /* start user account dropdown container style */
                .user-account-dropdown-container{
                    width: 150px;
                    background-color: #fff;
                    position: absolute;
                    top: 65px;
                    right: 5px;
                    border: `+borderColor+`;
                    z-index: 1001;
                    border-radius: 5px;
                    -webkit-box-shadow: 0px 0px 5px 0px rgba(168,168,168,1);
                    -moz-box-shadow: 0px 0px 5px 0px rgba(168,168,168,1);
                    box-shadow: 0px 0px 5px 0px rgba(168,168,168,1);
                    transition: all 0.3s ease;
                    -webkit-transition: all 0.3s ease;
                    -o-transition: all 0.3s ease;
                    transform: translateX(160px);
                    -webkit-transform: translateX(160px);
                    -o-transform: translateX(160px);
                }
                .user-account-dropdown-container.open{
                    transform: translateX(0);
                    -webkit-transform: translateX(0);
                    -o-transform: translateX(0);
                }
                .user-account-dropdown-container-inner{
                    padding: 10px;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }
                .user-account-dropdown-item{
                    text-decoration: none;
                    margin: 10px;
                    transition: color 0.3s ease;
                    -webkit-transition: color 0.3s ease;
                    -o-transition: color 0.3s ease;
                }
                .user-account-dropdown-item:hover{
                    color: black;
                }
                /* end user account dropdown container style */

            </style>
            <div>

                <!--start sidebar-->
                <div class="sidebar">
                    <div class="sidebar-inner">

                        <!-- start side bar logo -->
                        <div class="sidebar-logo">
                            <div class="peers">
                                <div class="sidebar-logo-image">
                                    <img src="https://bower.io/img/bower-logo.png">
                                </div>
                                <span class="sidebar-logo-title">Company Name</span>
                            </div>
                        </div>
                        <!-- end side bar logo -->

                    </div>
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

                                <!-- start left nav user avatar and name container-->
                                <div class="user-avatar-and-name-container">

                                    <!-- start user avatar -->
                                    <div class="user-avatar">
                                        <img src="https://www.biography.com/.image/t_share/MTE5NTU2MzE2NTE5MzAyNjY3/elizabeth-olsen-20631899-1-402.jpg">
                                    </div>
                                    <!-- end user avatar -->

                                    <!-- start user name -->
                                    <span class="username">Dalang</span>
                                    <!-- end user name -->
                                    
                                    <!-- start account dropdown container -->
                                    <div class="user-account-dropdown-container">
                                        <div class="user-account-dropdown-container-inner">
                                            <a href="" class="user-account-dropdown-item"><i class="fas fa-user-circle"></i> Account</a>
                                            <a href="" class="user-account-dropdown-item"><i class="fas fa-sign-out-alt"></i> Logout</a>
                                        </div>
                                    </div>
                                    <!-- end account dropdown container -->

                                </div>
                                <!-- end left nav user avatar and name container-->

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
        this.shadow.querySelector('.sidebar').onmouseover = e => this.maximizeSideBarOnMouseOver(e);
        this.shadow.querySelector('.sidebar').onmouseout = e => this.minimizeSideBarOnMouseOver(e);
        this.shadow.querySelector('.user-avatar-and-name-container').onclick = e => this.showUpUserAccountDropDown(e);
        window.onclick = e => this.windowClickEvent(e);//use to remove user account dropdown when it opened (click everywhere on screen to close it)
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
            this.showSideBarLogoTitle(false);
        }
        else{
            //open
            header.classList.remove('collapsed');
            sidebar.classList.remove('collapsed');
            pageContainer.classList.remove('collapsed');
            this.showSideBarLogoTitle(true);
        }
        this.isSidebarOpen = !this.isSidebarOpen;
    }

    maximizeSideBarOnMouseOver(e){
        const sidebar = this.shadow.querySelector('.sidebar');
        if(sidebar.classList.contains('collapsed') && !this.isSidebarOpen){ //accur only when sidebar is collapsed
            //console.log('side bar is collapsed');
            sidebar.classList.remove('collapsed');
            this.showSideBarLogoTitle(true);
        }
    }
    minimizeSideBarOnMouseOver(e){
        const sidebar = this.shadow.querySelector('.sidebar');
        if(!sidebar.classList.contains('collapsed') && !this.isSidebarOpen){ //accur only when sidebar is collapsed
            //console.log('side bar is not collapsed');
            sidebar.classList.add('collapsed');
            this.showSideBarLogoTitle(false);
        }
    }

    showSideBarLogoTitle(isShow){
        const sidebarLogoTitle = this.shadow.querySelector('.sidebar-logo-title');
        if(isShow){
            sidebarLogoTitle.classList.remove('collapsed');
        }else{
            sidebarLogoTitle.classList.add('collapsed');
        }
    }

    isUserAccountDropdownOpen = false;
    showUpUserAccountDropDown(e){
        e.stopPropagation();
        const userAccountDropDown = this.shadow.querySelector('.user-account-dropdown-container');
        if(this.isUserAccountDropdownOpen){
            userAccountDropDown.classList.remove('open');
        }else{
            userAccountDropDown.classList.add('open');
        }
        this.isUserAccountDropdownOpen = !this.isUserAccountDropdownOpen;
    }

    windowClickEvent(e){
        e.stopPropagation();

        const userAccountDropDown = this.shadow.querySelector('.user-account-dropdown-container');
        if(this.isUserAccountDropdownOpen){
            userAccountDropDown.classList.remove('open');
            this.isUserAccountDropdownOpen = !this.isUserAccountDropdownOpen;
        }
    }
}
window.customElements.define('d-admin-layout', DAdminLayout);
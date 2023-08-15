import m from "mithril";
import AuthManager from "./Auth";
import AuthMSA from "./AuthMSA";



// App
class App {
    static title;
    static name;
    static version;
    static offline;
    static public;
    static userName;

    static auth = null;

    constructor() {
        this.auth = new AuthManager();
        this.name = "MetroPlus";
        this.version = " v2.0.0";
        if (this.auth.isAuthenticated()) {
            this.userName = this.auth.user;
            let name = this.userName.userName.split("@");
            this.userName = name[0];
        }

    }

    hasProfile(profile) {
        return this.auth.hasProfile(profile);
    }

    isAuthenticated() {
        if (!this.auth.isAuthenticated()) {
            this.logout();
        }

        return this.auth.isAuthenticated();
    }

    isPublic() {
        if (this.auth.isAuthenticated()) {
            this.getInicio();
        }
        return !this.auth.isAuthenticated();

    }

    logout() {
        this.auth.logout();
        m.route.set("/");
    }

    getInicio() {
        m.route.set("/inicio");
    }

    login() {
        this.auth.login({ email: "user@example.com", password: "123456" }).then((result) => {
            if (result) {
                console.log("Login exitoso");
                console.log("Token:", this.auth.token);
                console.log("Usuario:", this.auth.user);
                this.getInicio();
            } else {
                console.log("Login fallido");
            }
        });
    }

    loginMSA() {
        return AuthMSA.login();
    }

    loader() {
        return [
            m(
                "div.text-center.mg-t-300",
                m(
                    ".spinner-grow.text-dark[role='status']",
                    m("span.sr-only", "Cargando...")
                )
            ),
        ];
    }

    oncreate() {
        document.title = this.title + " | " + this.name + this.version;
        loadCustomPage();

    }



    view() { }

}



function loadCustomPage() {

    feather.replace();

    ////////// NAVBAR //////////

    // Initialize PerfectScrollbar of navbar menu for mobile only
    if (window.matchMedia('(max-width: 991px)').matches) {
        const psNavbar = new PerfectScrollbar('#navbarMenu', {
            suppressScrollX: true
        });
    }

    // Showing sub-menu of active menu on navbar when mobile
    function showNavbarActiveSub() {
        if (window.matchMedia('(max-width: 991px)').matches) {
            $('#navbarMenu .active').addClass('show');
        } else {
            $('#navbarMenu .active').removeClass('show');
        }
    }

    showNavbarActiveSub()
    $(window).resize(function () {
        showNavbarActiveSub()
    })

    // Initialize backdrop for overlay purpose
    $('body').append('<div class="backdrop"></div>');


    // Showing sub menu of navbar menu while hiding other siblings
    $('.navbar-menu .with-sub .nav-link').on('click', function (e) {
        e.preventDefault();
        $(this).parent().toggleClass('show');
        $(this).parent().siblings().removeClass('show');

        if (window.matchMedia('(max-width: 991px)').matches) {
            psNavbar.update();
        }
    })

    // Closing dropdown menu of navbar menu
    $(document).on('click touchstart', function (e) {
        e.stopPropagation();

        // closing nav sub menu of header when clicking outside of it
        if (window.matchMedia('(min-width: 992px)').matches) {
            var navTarg = $(e.target).closest('.navbar-menu .nav-item').length;
            if (!navTarg) {
                $('.navbar-header .show').removeClass('show');
            }
        }
    })

    $('#mainMenuClose').on('click', function (e) {
        e.preventDefault();
        $('body').removeClass('navbar-nav-show');
    });

    $('#sidebarMenuOpen').on('click', function (e) {
        e.preventDefault();
        $('body').addClass('sidebar-show');
    })

    // Navbar Search
    $('#navbarSearch').on('click', function (e) {
        e.preventDefault();
        $('.navbar-search').addClass('visible');
        $('.backdrop').addClass('show');
    })

    $('#navbarSearchClose').on('click', function (e) {
        e.preventDefault();
        $('.navbar-search').removeClass('visible');
        $('.backdrop').removeClass('show');
    })



    ////////// SIDEBAR //////////

    // Initialize PerfectScrollbar for sidebar menu
    if ($('#sidebarMenu').length) {
        const psSidebar = new PerfectScrollbar('#sidebarMenu', {
            suppressScrollX: true
        });


        // Showing sub menu in sidebar
        $('.sidebar-nav .with-sub').on('click', function (e) {
            e.preventDefault();
            $(this).parent().toggleClass('show');

            psSidebar.update();
        })
    }


    $('#mainMenuOpen').on('click touchstart', function (e) {
        e.preventDefault();
        $('body').addClass('navbar-nav-show');
    })

    $('#sidebarMenuClose').on('click', function (e) {
        e.preventDefault();
        $('body').removeClass('sidebar-show');
    })

    // hide sidebar when clicking outside of it
    $(document).on('click touchstart', function (e) {
        e.stopPropagation();

        // closing of sidebar menu when clicking outside of it
        if (!$(e.target).closest('.burger-menu').length) {
            var sb = $(e.target).closest('.sidebar').length;
            var nb = $(e.target).closest('.navbar-menu-wrapper').length;
            if (!sb && !nb) {
                if ($('body').hasClass('navbar-nav-show')) {
                    $('body').removeClass('navbar-nav-show');
                } else {
                    $('body').removeClass('sidebar-show');
                }
            }
        }
    });

};



export default App;
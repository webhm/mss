class Menu {
    static modulos = [{
        page: 'endoscopia/agendas/configuracion',
        label: 'Configuración de Agendas',
        profile: 'PERFIL_AG_ADM_ENDOSCOPIA',
        icon: 'fa-cog'
    }, {
        page: 'endoscopia/agendas/perfiles',
        label: 'Perfiles de Usuario',
        profile: 'PERFIL_AG_ADM_ENDOSCOPIA',
        icon: 'fa-user'
    }, {
        page: 'endoscopia/agendas/calendario',
        label: 'Ver Calendario',
        profile: 'PERFIL_AG_GEST_ENDOSCOPIA',
        icon: 'fa-calendar-day'
    }];
}


export default Menu;
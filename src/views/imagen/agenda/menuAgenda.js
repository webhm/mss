class MenuAgenda {
    static modulos = [{
        page: 'imagen/agendas/configuracion',
        label: 'Configuración de Agendas',
        profile: 'PERFIL_AGENDAMV_ADMIN_IMAGEN',
        icon: 'fa-cog'
    }, {
        page: 'imagen/agendas/perfiles',
        label: 'Perfiles de Usuario',
        profile: 'PERFIL_AGENDAMV_ADMIN_IMAGEN',
        icon: 'fa-user'
    }, {
        page: 'imagen/agendas/calendario',
        label: 'Ver Calendario',
        profile: 'PERFIL_AGENDAMV_GEST_IMAGEN',
        icon: 'fa-calendar-day'
    }];
}


export default MenuAgenda;
Template.dashboard.helpers({
    getFastAccess: function () {
        return [{
            color: 'red',
            icon: 'fa fa-th-large',
            text: 'Categorias',
            link: '/categorias/list'
        },
            {
                color: 'blue',
                icon: 'fa fa-th',
                text: 'Productos',
                link: '/productos/list'
            },
            {
                color: 'green',
                icon: 'fa fa-shopping-cart',
                text: 'Compras',
                link: '/compras'
            },
            {
                color: 'yellow',
                icon: 'fa fa-usd',
                text: 'Ventas',
                link: '/ventas'
            }];
    }
});



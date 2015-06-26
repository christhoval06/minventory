Template.dashboard.helpers({
    getFastAccess: function () {
        return [{
            color: 'red',
            icon: 'fa fa-th-large',
            text: 'Categorias',
            page: 'categoriasList',
            exec: function () {
            }
        },
            {
                color: 'blue',
                icon: 'fa fa-th',
                text: 'Productos',
                page: 'productosList',
                exec: function () {
                }
            },
            {
                color: 'green',
                icon: 'fa fa-shopping-cart',
                text: 'Compras',
                page: 'comprasList',
                exec: function () {
                }
            },
            {
                color: 'yellow',
                icon: 'fa fa-usd',
                text: 'Ventas',
                page: 'ventasList',
                exec: function () {
                }
            }];
    }
});
Template.dashboard.events({
    'click a.fast-access': function (e, t) {
        e.preventDefault();
        this.exec();
        Session.set("page", this.page);
    }
});



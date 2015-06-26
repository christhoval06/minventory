/**
 * Created by christhoval on 02/04/15.
 */

Template.menu.helpers({
    getMenu: function () {
        return [

            /* COMPRAS */
            {
                label: 'Compras',
                sub: true,
                menu: [
                    {
                        item: true,
                        label: 'Lista',
                        link: '/compras',
                    },
                    {
                        item: true,
                        label: 'Nueva Factura',
                        link: '/compra',
                    }
                ]
            },

            /* PRODUCTOS */
            {
                label: 'Productos',
                sub: true,
                menu: [
                    {
                        item: true,
                        label: 'Lista',
                        link: '/productos',
                    },
                    {
                        item: true,
                        label: 'Agregar',
                        link: '/producto',
                    },
                    {
                        divider: true
                    },
                    {
                        item: true,
                        label: 'En Inventario',
                        link: '#'
                    }
                ]
            },

            /* CATEGORIAS */
            {
                label: 'Categorias',
                sub: true,
                menu: [
                    {
                        item: true,
                        label: 'Lista',
                        link: '/categorias',
                    },
                    {
                        item: true,
                        label: 'Agregar',
                        link: '/categoria',
                    }
                ]
            }
        ];
    }
});

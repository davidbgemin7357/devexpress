class Prueba {
    constructor() {
        this.init();
        this.employees = [];
    }

    async init() {
        try {
            await this.initDataServer();
            this.devex();
        } catch (error) {
            console.log(error);
        }
    }

    devex() {
        this.dx = {
            gridEmployees: null,
            mvTabs: null,
            tabGrids: null,
            tbarMv: null,
        };

        this.dx.tbarMv = $('<div>')
        .dxToolbar({
            items: [
                {
                    location: 'before',
                    text: 'Hola'
                },
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        text: 'Siguiente vista vista',
                        hint: 'Mostrar siguiente vista',
                        icon: 'check',
                        type: 'success',

                    }
                }
            ]
        }).dxToolbar('instance')

        this.dx.gridEmployees = $("<div>")
            .dxDataGrid({
                dataSource: this.employees,
                // keyExpr: 'employeeId',
                showColumnLines: true,
                rowAlternationEnabled: true,
                wordWrapEnabled: true,
                searchPanel: {
                    visible: true,
                    width: 240,
                    placeholder: "Buscar...",
                },
            })
            .dxDataGrid("instance");

        this.dx.tabGrids = $("<div>")
            .dxTabPanel({
                selectedIndex: 0,
                animationEnabled: true,
                loop: false,
                items: [
                    {
                        title: 'Empleados',
                        icon: 'user',
                        template: (itemData, itemIndex, element) => {
                            element
                                .append(
                                    this.dx.gridEmployees.element(),
                                );
                        }
                    }
                ],
            })
            .dxTabPanel("instance");

        this.dx.mvTabs = $("<div>")
            .dxMultiView({
                selectedIndex: 0,
                loop: false,
                animationEnabled: true,
                swipeEnabled: true,
                items: [
                    {
                        template: (itemData, itemIndex, element) => {
                            element.append(
                                // this.dx.tabGrids.element()
                                this.dx.tbarMv.element(),
                                this.dx.gridEmployees.element()
                            )
                        },
                    },
                ],
            })
            .dxMultiView("instance");

        $("#contenedor").addClass("container").append(
            this.dx.mvTabs.element()
        );
    }

    async initDataServer() {
        try {
            const response = await fetch(
                "https://randomuser.me/api/?results=40"
            );
            if (!response.ok) throw new Error("Error en la solicitud");
            this.employees = (await response.json()).results.map((p) => {
                return {
                    name: p.name.first + " " + p.name.last,
                    email: p.email,
                    gender: p.gender,
                    id: p.id.value,
                    phone: p.cell,
                    country: p.location.country,
                    photo: p.picture.large,
                    age: p.dob.age,
                    username: p.login.username,
                };
            });
        } catch (error) {
            console.log(error);
        }
    }
}

window.onload = function () {
    try {
        new Prueba();
    } catch (err) {
        console.warn(err);
    }
};

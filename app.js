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
        }
        

        this.dx.gridEmployees = $('<div>')
        .dxDataGrid({
            dataSource: this.employees,
            // keyExpr: 'employeeId',
            showColumnLines: true,
            rowAlternationEnabled: true,
            wordWrapEnabled: true,
            searchPanel: {
                visible: true,
                width: 240,
                placeholder: 'Buscar...'
            }
        }).dxDataGrid('instance')

        $('#contenedor')
        .addClass('container')
        .append(
            this.dx.gridEmployees.element(),
        );
    }



    async initDataServer() {
        try {
            
            // const response = await fetch("https://reqres.in/api/users?page=2")
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
            debugger;
            if(!response.ok) throw new Error('Error en la solicitud');
            this.employees = (await response.json()).results;
            const name = "David"
            // .map(p => {
            //     return {
            //         employeeId: p.id,
            //         picture: p.avatar,
            //         email: p.email,
            //         name: p.first_name,
            //         lastname: p.last_name,
            //     }
            // });

        } catch (error) {
            console.log(error)
        }
    }


}



window.onload = function () {
    try {
        new Prueba();
    } catch (err) {
        console.warn(err);
    }
}

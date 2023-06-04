const getData = async(url) => {
    try {
        const response = await fetch(url)
        if(!response.ok) throw new Error('Error en la solicitud');
        return (await response.json()).data
    } catch (error) {
        return error
    }
}

const data = await getData("https://reqres.in/api/users?page=2");
const dataEmployees = data.map(p => {
    return {
        employeeId: p.id,
        picture: p.avatar,
        email: p.email,
        name: p.first_name,
        lastname: p.last_name,
    }
})

export {
    dataEmployees
}
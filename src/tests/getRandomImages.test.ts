import getRandomImages from "../helpers/getRandomImages";

describe( "Obteniendo imagenes aleatorias", ()=>{
    const array = [ "a", "b", "c","d", "e", "f"]

    it("Debe crear un array con el doble del numero de images", ()=>{
        const result = getRandomImages( array, 2 )
        expect( result.length).toBe( 4 )
    })

    it( "Si el tamaño del array es menor al numbero de imagenes retornar nada",()=>{
        const result = getRandomImages( array, array.length+1)
        expect( result ).toEqual([])
    })

})
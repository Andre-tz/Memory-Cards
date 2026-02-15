import changeMmSs from "../helpers/changeMmSs";

describe( "changeMmSS", ()=>{
    it( "Formatear 0 segundos como 00:00", ()=>{
        expect( changeMmSs( 0 )).toBe( "00:00")
    })

    it( "Formatear 100 segundos como 01:40", ()=>{
        expect( changeMmSs( 100 )).toBe("01:40")
    } )
})
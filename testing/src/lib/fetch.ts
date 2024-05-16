export const getGameByName = async (name: string) => { 
    try { 
        return await fetch('http://localhost:3001/api/items/');
    } catch (error) { 
        console.log(error);
    }
}

const useColorGenerator = () => {
    const randomColorUtility = (length: number) => Math.floor(Math.random() * length);

    const createColor=()=>{
        const colors:string[] = ["purple","cyan","blue","teal","yellow","orange","green","pink","red","gray"];
        let chakraColor = colors[randomColorUtility(colors.length)];
        return chakraColor;
    }
    
    return createColor;
}
 
export default useColorGenerator;
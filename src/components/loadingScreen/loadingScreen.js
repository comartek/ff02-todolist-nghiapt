
import LoadingScreen from "react-loading-screen";

export default function Loading({load}) {
  
  return (
    <div className="App">
      
      <LoadingScreen
        loading={load}
        bgColor="rgba(255,255,255,0.6)"
        spinnerColor="#9ee5f8"
        textColor="#676767"
        logoSrc=""
       
        
      />
        
      
    </div>
  );
}
import React,{useState} from 'react';
import "./App.css"








function App() {
  const data = [
    {name:'Product A',price :300},
    {name:'Product B',price :200},
    {name:'Product C',price :700},
    {name:'Product D',price :500},
    {name:'Product E',price :650},
    {name:'Product F',price :800},
    



  ]
  const alist = []

  for(let i=0;i<3;i++)
  {
    alist.push( 
               <div>
                    <ul>
                        <li>{data[i].name}</li>
                        <li>{data[i].price}</li>
                    </ul>

                </div>
              )
  }
  
  const [list,setList] = useState(alist);
  
 
  
  
  const setValue=(length=3)=>{
      const alist = []

      for(let i=0;i<length;i++)
      {
        alist.push(
                <div>
                    <ul>
                        <li>{data[i].name}</li>
                        <li>{data[i].price}</li>
                    </ul>

                </div>
               
          
          )
      }
      setList(alist)


  }


  const collapse = ()=>{
     
     setValue(3)

  }

  const viewall = ()=>{
      setValue(6)

  }
 
 


  return (
  
       
        
              
                <div>
                 {list.length===3 ? (
                    <div>
                      {list}
                        <button onClick={viewall} >view all</button>
                    </div>

                  ):(
                    <div>
                      {list}
                      <button onClick={collapse}>collapse</button>
                  </div>

                  ) }
            
                 </div>
         
         


    





 
    
    
  
  );
}

export default App;

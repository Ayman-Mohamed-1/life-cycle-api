import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function App() {
  const [term, setTerm]= useState("css")
  // const [debonunceSearh, setDebonunceSearh]= useState(term)
  const [result, setResult] = useState([])
  const termUseRef = useRef();

  // -------------------------حل لمشكله ظهور الطاي مرتين ................................
  // -----------------  مرتين uesEffect كييفه استخدام ----------------------------------------------------------------
//   useEffect(() =>{
//       const timeout = setTimeout(() =>{
//         setDebonunceSearh(term)
//       },1200)
//       return () => {
//         clearTimeout(timeout);
//       }
// },[term]);

// useEffect(() =>{
//      const search = async () =>{
//       const respond = await axios.get('https://en.wikipedia.org/w/api.php',{
//        params:{
//           action: 'query',
//           list: 'search',
//           origin:'*',
//           format: 'json',
//           srsearch: debonunceSearh,
//         },
//       });
//       setResult(respond.data.query.search);
//     };
//     search();
// },[debonunceSearh])


// -----------------------------------------
  useEffect(() =>{
    termUseRef.current = term; 
  }) 

  const prevTerm =  termUseRef.current

  useEffect(() =>{
    const search = async () =>{
      const respond = await axios.get('https://en.wikipedia.org/w/api.php',{
       params:{
          action: 'query',
          list: 'search',
          origin:'*',
          format: 'json',
          srsearch: term,
        },
      });
      setResult(respond.data.query.search);
    };
    if (!result.length) {

     if(term) {
       search();
     }

    }else if(prevTerm !== term) {
      const debonunceSearh = setTimeout(() =>{
        if(term){
          search();
        }
      },1200)
      return () => {
        clearTimeout(debonunceSearh);}}

  },[term, result.length, prevTerm])

  const fatchResults = result.map(el =>{
    return(
        <tr key={el.pageid}>
          <td >1</td>
          <td>{el.title}</td>
          <td>
            <span dangerouslySetInnerHTML={{__html: el.snippet}}/>  
            {/* dangerouslySetInnerHTML={{__html: el.snippet}}  
            بترجم الراجع من 
            api 
            الراجع يصيغه
            xml | html
                بيرجع كدا عشان نظام حمايه
            */}
          </td>
        </tr>
    )
  })















  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <div className='my-3'>
            <label htmlFor='exampleFormControlInput1' className='form-label'>
              Search Input
            </label>
            <input
              type='text'
              className='form-control'
              id='exampleFormControlInput1'
              onChange={(e)=>setTerm(e.target.value)} value={term}
            />
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col'>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Title</th>
                <th scope='col'>Desc</th>
              </tr>
            </thead>
            <tbody>
              {fatchResults}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


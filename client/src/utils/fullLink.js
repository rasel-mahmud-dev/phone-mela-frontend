
import { baseUri  } from "src/apis/api"



function fullLink(link){
	
  if(link) {
      if(link.startsWith("http")){
          return link
      } else {
          let a = link.indexOf("phone_mela")

          if(a !== -1) {
              let aa = baseUri + "/" + link.slice(a + 11)
              return aa
          } else {
              return  link
          }
      }
  } else {
    return  ""
  }
}

export default fullLink

import axios from "axios";

// export function getDogs() {
//     return function (dispatch) {
//       return axios
//         .get("http://localhost:3001/dogs")
//         .then((dogs) => {
//           dispatch({
//             type: "GET_DOGS",
//             payload: dogs,
//           });
//         });
//     };
//   }

export function getDogs() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/dogs", {
      
    });
    return dispatch({
      type: "GET_DOGS",
      payload: json.data,
    });
  };
}

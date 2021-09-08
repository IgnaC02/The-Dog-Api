const initalState = {
  dogs: [],
  allDogs: [],
  temperaments: [],
  detail: [],
};

function rootReducer(state = initalState, action) {
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };

    case "GET_BREED_NAME":
      return {
        ...state,
        dogs: action.payload,
      };

    case "FILTER_CREATED":
      const all_Dogs = state.allDogs;
      const createdFilter =
        action.payload === "created"
          ? all_Dogs.filter((ob) => ob.createdDb)
          : all_Dogs.filter((ob) => !ob.createdDb);
      return {
        ...state,
        dogs: action.payload === "all" ? state.allDogs : createdFilter,
      };

    case "ORDER_BY_NAME":
      let sortedArr =
        action.payload === "asc"
          ? state.dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: sortedArr,
      };

    case "ORDER_BY_WEIGHT":
      let sorted_Arr =
        action.payload === "mayor_menor"
          ? state.dogs.sort(function (a, b) {
              if (
                parseInt(a.weight.split("-")[1]) >
                parseInt(b.weight.split("-")[1])
              ) {
                return -1;
              }
              if (
                parseInt(b.weight.split("-")[1]) >
                parseInt(a.weight.split("-")[1])
              ) {
                return 1;
              }
              return 0;
            })
          : state.dogs.sort(function (a, b) {
              if (
                parseInt(a.weight.split("-")[0]) >
                parseInt(b.weight.split("-")[0])
              ) {
                return 1;
              }
              if (
                parseInt(b.weight.split("-")[0]) >
                parseInt(a.weight.split("-")[0])
              ) {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: sorted_Arr,
      };

    case "FILTER_BY_TEMP":
      const allDogs = state.allDogs;
      const regularExpression = /\s*,\s*/;
      const filteredDogs = allDogs.filter((ob) =>
        ob.temperament?.split(regularExpression).includes(action.payload)
      );
      console.log(filteredDogs);
      return {
        ...state,
        dogs: filteredDogs,
      };

    case "GET_TEMPERAMENTS":
      return {
        ...state,
        temperaments: action.payload,
      };

    case "POST_DOGS":
      return {
        ...state,
      };

    case "GET_DETAILS":
      return {
        ...state,
        detail: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;

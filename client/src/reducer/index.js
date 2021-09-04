const initalState = {
  dogs: [],
  allDogs: [],
};

function rootReducer(state = initalState, action) {
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
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
              if (a.weight > b.weight) {
                return 1;
              }
              if (b.weight > a.weight) {
                return -1;
              }
              return 0;
            })
          : state.dogs.sort(function (a, b) {
              if (a.weight > b.weight) {
                return -1;
              }
              if (b.weight > a.weight) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: sorted_Arr,
      };

    default:
      return state;
  }
}

export default rootReducer;

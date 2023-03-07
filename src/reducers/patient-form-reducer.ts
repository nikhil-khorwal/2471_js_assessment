const textChangeHandler = (state: any, actions: any) => {
  return { ...state, ...actions.payload }
}

const imageChangeHandler = (state: any, actions: any) => {
  return { ...state, images: [...state.images, ...actions.payload.images] }
}
const imageRemoveHandler = (state: any, actions: any) => {
  return { ...state, images: [...actions.payload.images] }
}

const dateChangeHandler = (state: any, actions: any) => {
  const dob = actions.payload.patientDOB
  const today = new Date()
  const getDate = new Date(dob)

  const dobIsValid = (today.getFullYear() - getDate.getFullYear()) > 18

  return { ...state, ...actions.payload, isAgeDisabled: !dobIsValid }
}

const patientFormReucer = (state: any, actions: any) => {
  switch (actions.type) {
    case "textChange": return textChangeHandler(state, actions);
    case "dateChange": return dateChangeHandler(state, actions);
    case "imageChange": return imageChangeHandler(state, actions);
    case "imageRemove": return imageRemoveHandler(state, actions);
  }
}

export default patientFormReucer
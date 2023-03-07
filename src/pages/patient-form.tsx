import React, { Dispatch, FormEvent, useEffect, useReducer, useState } from "react"
import Button from "../components/button/button"
import InputCard from "../components/input-card/input-card"
import patientFormReucer from "../reducers/patient-form-reducer"
import { Constants } from "../utils/constants"
import './patient-form.css'

const personImage = require("../assets/images/person.png")
const ageImage = require("../assets/images/age.png")
const addImage = require("../assets/images/add.png")
const allergyImage = require("../assets/images/allergy.png")
const cakeImage = require("../assets/images/cake.png")
const chiefComplainImage = require("../assets/images/chief-complain.png")
const currentMedicationImage = require("../assets/images/current-medication.png")
const nameTagImage = require("../assets/images/name-tag.png")
const phoneNoImage = require("../assets/images/phone-no.png")
const stateImage = require("../assets/images/state.png")
const uploadImage = require("../assets/images/upload-photo.png")
const editImage = require("../assets/images/sign-consent.png")


const PatientForm = () => {

  const [state, dispatch]: any = useReducer<any>(patientFormReucer, Constants.PATIENT_FORM_INIT)
  const timeOutHandler = (date1: any, date2: any) => {
    setTimeout(() => {
      localStorage.removeItem("patientTime");
    }, Math.floor((date1.getTime() - date2.getTime())));
  }
  useEffect(() => {
    const prvData = localStorage.getItem("patientTime")
    if (prvData) {
      dispatch({
        type: "textChange",
        payload: JSON.parse(prvData)
      })
    }
    var localTime = localStorage.getItem("afterTime")
    if (localTime) {
      const time = new Date()
      time.setTime(parseInt(localTime))
      const afterMin = new Date()
      timeOutHandler(time, afterMin)
    }
  }, [])


  const errorHandler = (msg: any) => {
    dispatch({
      type: "textChange",
      payload: { errorMsg: msg }
    })
  }

  const formSubmitHandler = (event: any) => {

    event.preventDefault();
    if (!state.patientFirstName) {
      errorHandler("Please enter patient first name")
    } else if (!state.patientLastName) {
      errorHandler("Please enter patient last name")
    } else if (!state.patientDOB) {
      errorHandler("Please enter patient DOB")
    } else if (!state.above18) {
      errorHandler("Please select age")
    } else if (!state.gaurdianFirstName) {
      errorHandler("Please enter gaurdian first name")
    } else if (!state.gaurdianLastName) {
      errorHandler("Please enter gaurdian last name")
    } else if (!state.primaryReason) {
      errorHandler("Please enter primary reason")
    } else if (!state.currentMedications) {
      errorHandler("Please enter current medications")
    } else if (!state.allergies) {
      errorHandler("Please enter allergies")
    } else if (!state.phoneNmber) {
      errorHandler("Please enter phone nmber")
    } else if (isNaN(state.phoneNmber) || state.phoneNmber.length != 10) {
      errorHandler("Please enter valid phone nmber")
    } else {
      errorHandler("")
      const patientData = state;
      patientData["errorMsg"] = ""
      localStorage.setItem("patientTime", JSON.stringify(patientData))
      const afterMin = new Date()
      afterMin.setMinutes(afterMin.getMinutes() + 30)
      localStorage.setItem("afterTime", afterMin.getTime().toString())
      timeOutHandler(afterMin, new Date())
    }


  }
  const imageHandler = (event: any) => {
    const images = []
    for (var i = 0; i < event.target.files.length; i++) {
      images.push(URL.createObjectURL(event.target.files[i]))
    }
    dispatch({
      type: "imageChange",
      payload: { images: images }
    })
  }
  const imageRemoveHandler = async (index: number) => {
    dispatch({
      type: "imageRemove",
      payload: { images: await Promise.all(state.images.filter((item: string, idx: number) => idx != index)) }
    })
  }

  return (<div className="form-background">
    <div className="form-content">
      <div className="form-title">
        <h2>Patient info</h2>
      </div>
      <form action="" className="patient-form" onSubmit={formSubmitHandler}>
        <div className="form-grid">
          <InputCard
            icon={personImage}
            label="Patient first name">
            <input

              type="text"
              value={state.patientFirstName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch({
                  type: "textChange",
                  payload: { patientFirstName: e.target.value }
                })
              }}
            />
          </InputCard>
          <InputCard
            icon={personImage}
            label="Patient last name">
            <input
              type="text" value={state.patientLastName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch({
                  type: "textChange",
                  payload: { patientLastName: e.target.value }
                })
              }} />
          </InputCard>
          <InputCard
            icon={cakeImage}
            label="Patient DOB">
            <input
              type="date" value={state.patientDOB} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch({
                  type: "dateChange",
                  payload: { patientDOB: e.target.value }
                })
              }} />
          </InputCard>
          <InputCard
            icon={ageImage}
            label="above 18">
            <div className="about-age">
              <input type="radio" name="checkAge" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch({
                  type: "textChange", payload: {
                    above18: true
                  }
                })
              }} id="yes" disabled={state.isAgeDisabled} checked={(!state.isAgeDisabled && state.above18)} />
              <label htmlFor="yes">Yes</label>

              <input type="radio" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch({
                  type: "textChange", payload: {
                    above18: false
                  }
                })
              }} name="checkAge" id="no" disabled={state.isAgeDisabled} checked={(!state.isAgeDisabled && state.above18 === false)} />
              <label htmlFor="no">No</label>

            </div>
          </InputCard>
          <InputCard
            icon={nameTagImage}
            label="Gaurdian first name">
            <input
              type="text" value={state.gaurdianFirstName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch({
                  type: "textChange",
                  payload: { gaurdianFirstName: e.target.value }
                })
              }} />
          </InputCard>
          <InputCard
            icon={nameTagImage}
            label="Gaurdian  last name">
            <input
              type="text" value={state.gaurdianLastName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch({
                  type: "textChange",
                  payload: { gaurdianLastName: e.target.value }
                })
              }} />
          </InputCard>
          <InputCard
            icon={chiefComplainImage}
            label="Primary reason for visit">
            <textarea
              rows={3} value={state.primaryReason} onChange={(e: any) => {
                dispatch({
                  type: "textChange",
                  payload: { primaryReason: e.target.value }
                })
              }} />
          </InputCard>
          <InputCard
            icon={currentMedicationImage}
            label="Current medications">
            <textarea
              value={state.currentMedications} rows={3} onChange={(e: any) => {
                dispatch({
                  type: "textChange",
                  payload: { currentMedications: e.target.value }
                })
              }} />
          </InputCard>
          <InputCard
            icon={allergyImage}
            label="Allergies">
            <textarea
              value={state.allergies} rows={3} onChange={(e: any) => {
                dispatch({
                  type: "textChange",
                  payload: { allergies: e.target.value }
                })
              }} />
          </InputCard>
          <InputCard
            icon={stateImage}
            label="State">
            <select value={state.state} onChange={(e: any) => {
              dispatch({
                type: "textChange",
                payload: { state: e.target.value }
              })
            }} >
              {
                Constants.STATE_DATA.map((item: string, index: number) => <option key={index} value={item}>
                  {item}
                </option>)
              }
            </select>
          </InputCard>
          <InputCard
            icon={phoneNoImage}
            label="Pharmacy phone number">
            <input
              value={state.phoneNmber} type="tel" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch({
                  type: "textChange",
                  payload: { phoneNmber: e.target.value }
                })
              }} />
          </InputCard>
          <InputCard
            icon={uploadImage}
            label="Upload photos (optional)">
            <div className="form-images">
              <div className="upload-image">
                <img src={addImage} />
                <input type="file" multiple={true} onChange={imageHandler} />
              </div>
              <div className="uploaded-images">
                {state.images.length > 0 && state.images.map((item: string, index: number) => {
                  return <div key={index} className="uploaded-image">
                    <img src={editImage}
                      onClick={() => { imageRemoveHandler(index) }}
                      className="editicon" />
                    <img src={item} className="image" />
                  </div>
                })}
              </div>
            </div>
          </InputCard>

        </div>
        {state.errorMsg && <div className="errorMsg">
          <p>*{state.errorMsg}</p>
        </div>}
        <div className="form-button">
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  </div>)
}

export default PatientForm
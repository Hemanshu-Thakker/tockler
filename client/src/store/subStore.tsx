import { useState } from "react"

let codingKey = []
let codingbrowser = []
let browser = []
let meeting = []
let colab = []

export const getCodingArr = () => {
    return codingKey
}

export const updateCodingArr = (updated_arr) => {
    codingKey = updated_arr
}

export const getCodingBrowserArr = () => {
    return codingbrowser
}

export const updateCodingBrowserArr = (updated_arr) => {
    codingbrowser = updated_arr
}

export const getBrowserArr = () => {
    return browser
}

export const updateBrowserArr = (updated_arr) => {
    browser = updated_arr
}

export const getColabArr = () => {
    return colab
}

export const updateColabArr = (updated_arr) => {
    colab = updated_arr
}

export const getMeetingArr = () => {
    return meeting
}

export const updateMeetingArr = (updated_arr) => {
    meeting = updated_arr
}
cmake_minimum_required(VERSION 3.13)

# Define library name here.
project(appmodules)

# This file includes all the necessary to let you build your React Native application.
include(${REACT_ANDROID_DIR}/cmake-utils/ReactNative-application.cmake)

target_sources(${CMAKE_PROJECT_NAME} PRIVATE ../../../../../shared/NativeSampleModule.cpp)

target_include_directories(${CMAKE_PROJECT_NAME} PUBLIC ../../../../../shared)


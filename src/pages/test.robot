*** Settings ***
Library  SeleniumLibrary

*** Variables ***
${BASE_URL}   http://localhost:3000  # Update with your actual URL

*** Test Cases ***
Open Home Page
    Open Browser  ${BASE_URL}  chrome
    Maximize Browser Window
    Set Selenium Speed  0.5
    Page Should Contain Element  xpath=//div[contains(@class, 'flex flex-col mt-[4.5rem]')]
    Page Should Contain Element  xpath=//div[contains(@class, 'text-3xl md:text-4xl lg:text-5xl py-9 p-4 text-blue-900 font-Poppins font-bold z-[-2]')]
    Open Browser  ${BASE_URL+"/sign_in"}  chrome
    Maximize Browser Window
    Set Selenium Speed  0.5
    Page Should Contain Element  xpath=//div[contains(@class, 'flex min-h-full flex-1 flex-col justify-center px-6 py-12 font-Poppins')]
    Page Should Contain Element  xpath=//h2[contains(text(), 'Welcome back let Sign in')]
    Close Browser

Sign In With Valid Credentials
    Open Browser  ${BASE_URL+"/sign_in"}  chrome
    Maximize Browser Window
    Set Selenium Speed  0.5
    Input Text  id=username  YourValidUsername  # Replace with a valid username
    Input Password  id=password  YourValidPassword  # Replace with a valid password
    Click Element  xpath=//button[contains(text(), 'Sign in')]
    Sleep  2s  # Adjust the sleep time as needed
    Page Should Contain Element  xpath=//div[contains(@class, 'your-success-element')]  # Replace with a success element
    Close Browser

Sign In With Invalid Credentials
    Open Browser  ${BASE_URL+"/sign_in"}  chrome
    Maximize Browser Window
    Set Selenium Speed  0.5
    Input Text  id=username  InvalidUsername
    Input Password  id=password  InvalidPassword
    Click Element  xpath=//button[contains(text(), 'Sign in')]
    Sleep  2s
    Page Should Contain Element  xpath=//p[contains(@class, 'your-error-element')]  # Replace with an error element
    Close Browser
import "../App.css";
import { useCallback, useState } from "react";
//icons
import { CiEdit } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { IoIosRadioButtonOff } from "react-icons/io";

function Table() {
  const [userDetails, setUserDetails] = useState({
    userName: "",
    email: "",
    password: "",
    conformPassword: "",
    domain: "",
    gender: "Male",
    passwordError: "",
    emailError: "",
    userNameError: "",
    passwordLengthError: "",
  });
  //user login Details

  const [loginDetails, setloginDetails] = useState([]);

  //updathing  the details to card

  const [getIndex, setGetIndex] = useState(-1);
  const [checkEditDetails, setCheckEditDetails] = useState(false);

  //showing password message

  let [showPassword, setShowPassword] = useState(false);

  let [showConformPassword, setShowConformPassword] = useState(false);

  //// Array Of Email

  const [uniqueEmail, setUniqueEmails] = useState(true);

  // Edit button click on the  time only one edit button work untill submit button click

  let [onIsEdit, setOnIsEdit] = useState(true);

  ///check Email
  function checkEmail(emailAddress) {
    let atSymbol = emailAddress.indexOf("@");
    let dotSymbol = emailAddress.lastIndexOf(".");
    let spaceSymbol = emailAddress.indexOf(" ");
    let domainNames = [".com", ".in", ".gov", ".edu", ".net", ".mil"];
    let lastDomainString = "",
      flag = 0;
    for (let i = dotSymbol; i < emailAddress.length; i++) {
      lastDomainString += emailAddress[i];
    }
    for (let i = 0; i < domainNames.length; i++) {
      if (lastDomainString === domainNames[i]) {
        flag = 1;
      }
    }
    if (flag == 0) {
      setUserDetails((previousValue) => {
        return { ...previousValue, emailError: "Email given wrong format" };
      });
      return 0;
    }
    if (
      atSymbol != -1 &&
      atSymbol != 0 &&
      dotSymbol != -1 &&
      dotSymbol != 0 &&
      dotSymbol > atSymbol + 1 &&
      emailAddress.length > dotSymbol + 1 &&
      spaceSymbol == -1
    ) {
      setUserDetails((previousValue) => {
        return { ...previousValue, emailError: "" };
      });
      return true;
    } else {
      setUserDetails((previousValue) => {
        return { ...previousValue, emailError: "Email given wrong format" };
      });
      return false;
    }
  }

  //check unique email

  function checkUniqueEmailId(email) {
    let IsValue = loginDetails.some((val) => {
      return val.email == email;
    });
    console.log(email);
    if (IsValue) {
      setUniqueEmails(false);
    } else {
      setUniqueEmails(true);
    }
  }

  //check user name

  function checkName(userName) {
    const Name = [...userName].every(
      (char) => (char >= "a" && char <= "z") || (char >= "A" && char <= "Z")
    );
    if (!Name) {
      // console.log("kkkk")
      setUserDetails((previousValue) => {
        return { ...previousValue, userNameError: "Enter the only alphabets" };
      });
    } else {
      setUserDetails((previousValue) => {
        return { ...previousValue, userNameError: "" };
      });
    }
    return Name;
  }

  //function to checkpassword

  function checkPassword(password, conformPassword) {
    if (password == conformPassword) {
      setUserDetails((previousValue) => {
        return { ...previousValue, passwordError: "" };
      });
      return 1;
    }
    setUserDetails((previousValue) => {
      return { ...previousValue, passwordError: "password can't matching" };
    });
    // setPasswordError("password can't matching")
    return 0;
  }

  //Checking password length

  function checkPasswordLength(password) {
    let length = password.length;
    {
      if (length <= 8) {
        setUserDetails((previousValue) => {
          return { ...previousValue, passwordLengthError: 0 };
        });
        // setPasswordLengthError(0)
        return 0;
      } else {
        setUserDetails((previousValue) => {
          return { ...previousValue, passwordLengthError: 1 };
        });
        // setPasswordLengthError(1)
        return 1;
      }
    }
  }

  //user name
  const updatingUserNameValueOnChange = (event) => {
    const { name, value } = event.target;
    // console.log(userDetails.userName)
    setUserDetails({ ...userDetails, userName: value });
    checkName(event.target.value);

    //  console.log(loginDetails[2].userName)
    //  setUserDetails({loginDetails[2].userName:value})
  };

  //email

  const updatingEmailValueOnChange = (event) => {
    setUserDetails((previousValue) => {
      return { ...previousValue, email: event.target.value };
    });
    checkEmail(event.target.value);
    checkUniqueEmailId(event.target.value);
    console.log("calllll");
  };

  //password

  const updatePasswordValueOnChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((previousValue) => {
      return { ...previousValue, password: value };
    });
    checkPasswordLength(event.target.value);
    //  console.log(event1.target.value)
  };

  //conformedpassword

  const updateConformPasswordValueOnChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((previousValue) => {
      return { ...previousValue, conformPassword: value };
    });
    checkPassword(userDetails.password, event.target.value);
    //  console.log(event3.target.value)
  };
  ////domain name

  const updateDomainValueOnChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((previousValue) => {
      return {
        ...previousValue,
        domain: value,
      };
    });
    //  console.log(event1.target.value)
  };

  //seting gender

  function setUserGender(event) {
    let getGender = event.target.value;
    // console.log(getGender)
    setUserDetails({ ...userDetails, gender: getGender });
  }

  //submit the details
  const afterSubmitButtonClick = () => {
    console.log("kkk");
    if (
      !checkEditDetails &&
      userDetails.userName != "" &&
      userDetails.password != " " &&
      userDetails.email != "" &&
      userDetails.conformPassword != "" &&
      userDetails.domain != "" &&
      userDetails.gender != ""
    ) {
      if (
        checkName(userDetails.userName) &&
        checkEmail(userDetails.email) &&
        checkPassword(userDetails.password, userDetails.conformPassword) &&
        userDetails.passwordLengthError &&
        uniqueEmail
      ) {
        setloginDetails([
          ...loginDetails,
          {
            userName: userDetails.userName,
            email: userDetails.email,
            password: userDetails.password,
            conformPassword: userDetails.conformPassword,
            domain: userDetails.domain,
            gender: userDetails.gender,
          },
        ]);
        setUserDetails((previousValue) => {
          return {
            ...previousValue,
            userName: "",
            email: "",
            password: "",
            conformPassword: "",
            domain: "",
            gender:"Male",
          };
        });
        // console.log("jj")
      }
    }
    /// Editing the details after updating
    else if (
      checkEditDetails &&
      userDetails.userName != "" &&
      userDetails.password != " " &&
      userDetails.email != "" &&
      userDetails.conformPassword != "" &&
      userDetails.domain != "" &&
      userDetails.gender != ""
    ) {
      let update = [...loginDetails];
      update[getIndex] = userDetails;
      if (
        checkName(update[getIndex].userName) &&
        checkEmail(update[getIndex].email) &&
        checkPassword(
          update[getIndex].password,
          update[getIndex].conformPassword
        ) &&
        checkPasswordLength(update[getIndex].password) &&
        uniqueEmail
      ) {
        //checkUniqueEmailId(update[getIndex].email)
        console.log("hello");
        let update = [...loginDetails];
        update[getIndex] = userDetails;
        setloginDetails(update);
        setUserDetails((previousValue) => {
          return {
            ...previousValue,
            userName: "",
            email: "",
            password: "",
            conformPassword: "",
            domain: "",
            gender:"Male",
          };
        });
        setCheckEditDetails(false);
        setOnIsEdit(true);
      }
    }
  };

  //Editing the details

  function Edit(index) {
    if (onIsEdit) {
      setOnIsEdit(false);
      setCheckEditDetails(true);
      setGetIndex(index);
      // console.log(getIndex, checkEditDetails);
      setUserDetails(loginDetails[index]);
      //delete after editing email
      // deleteEmail(loginDetails[index].email)
      // console.log('dee')
      let deteleArray = { ...loginDetails[index] };
      deteleArray.email = "";
      let update = [...loginDetails];
      update[index] = deteleArray;
      setloginDetails(update);
    }
  }

  // Deleting after removing the particular login  details
  function Delete(index) {
    let allLoginUserDetails = [...loginDetails];
    let afterRemainDetails = allLoginUserDetails.filter(
      (value, ind) => ind != index
    );
    setloginDetails(afterRemainDetails);
  }

  ///showing Conformation password

  function ShowPassword() {
    setShowPassword(!showPassword);
  }

  //showing passsword
  function ShowConformPassword() {
    setShowConformPassword(!showConformPassword);
  }

  // Componentent
  return (
    <div className="fullscreen" class="mt-4">
      <div className="contain">
        <form id="form">
          <div>
            <input
              id="userName"
              name="userName"
              value={userDetails.userName}
              onChange={updatingUserNameValueOnChange}
              type="text"
              className={!userDetails.userName ? "red" : "blue"}
              placeholder="Name"
              maxLength={50}
              required
            />
            {!userDetails.userName ? (
              <p className="getProperDetailstoShowColor">
                please Enter the Username
              </p>
            ) : (
              <p></p>
            )}
            {userDetails.userNameError == "" ? (
              <p></p>
            ) : (
              <p className="error">{userDetails.userNameError}</p>
            )}
          </div>
          <div>
            <input
              id="email"
              name="email"
              value={userDetails.email}
              onChange={updatingEmailValueOnChange}
              type="email"
              className={!userDetails.email ? "red" : "blue"}
              placeholder="Email"
              required
            />
            {!userDetails.email ? (
              <p className="getProperDetailstoShowColor">
                please Enter the Email
              </p>
            ) : (
              <p></p>
            )}
            {userDetails.emailError == "" ? (
              <p></p>
            ) : (
              <p className="error">{userDetails.emailError}</p>
            )}
            {uniqueEmail ? (
              <p></p>
            ) : (
              <p className="error">Already Email is required</p>
            )}
          </div>
          <div className="input">
            <a href="#">
              <div className="eye" onClick={() => ShowPassword()}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </a>
            <input
              id="password"
              name="password"
              value={userDetails.password}
              onChange={updatePasswordValueOnChange}
              type={showPassword ? "text" : "password"}
              className={!userDetails.password ? "red" : "blue"}
              placeholder="Password"
              minLength={8}
              required
            />
            {!userDetails.password ? (
              <p className="getProperDetailstoShowColor">
                please Enter the Password
              </p>
            ) : (
              <p></p>
            )}
            {userDetails.passwordLengthError == " " ? (
              <p className="error">Minimun 9 letter required</p>
            ) : (
              <p></p>
            )}
          </div>
          <div className="input">
            <a href="#">
              <div className="eye" onClick={() => ShowConformPassword()}>
                {showConformPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </a>
            <input
              id="conformedpassword"
              name="conformPassword"
              value={userDetails.conformPassword}
              onChange={updateConformPasswordValueOnChange}
              type={showConformPassword ? "text" : "password"}
              className={!userDetails.conformPassword ? "red" : "blue"}
              placeholder="Conform Password"
              minLength={8}
              required
            />
            {!userDetails.conformPassword ? (
              <p className="getProperDetailstoShowColor">
                please Enter the Password
              </p>
            ) : (
              <p></p>
            )}
            {userDetails.passwordError == "" ? (
              <p></p>
            ) : (
              <p className="error">{userDetails.passwordError}</p>
            )}
          </div>
          <div>
            <label> Domains</label>
          </div>
          <div>
            <select
              id="domain"
              name="domain"
              value={userDetails.domain}
              onChange={updateDomainValueOnChange}
              type="text"
              className={!userDetails.domain ? "red" : "blue"}
              required
            >
              <option>Other</option>
              <option value="FullStack Web Development">
                FullStack Web Development
              </option>
              <option value="Data Science">Data Science</option>
              <option value="App Developer">App Developer</option>
              <option value="Data Analyst">Data Analyst</option>
            </select>
            {!userDetails.domain ? (
              <p className="getProperDetailstoShowColor">
                please Select the domain name
              </p>
            ) : (
              <p></p>
            )}
          </div>
          <div id="gender" className="gender">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={userDetails.gender === "Male"}
              onChange={setUserGender}
            />
            <label> Male</label>
          </div>
          <div className="gender">
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={userDetails.gender ==='Female'}
              onChange={setUserGender}
            />
            <label> Female</label>
          </div>
        </form>
        <div>
          <button
            name="loginDetails"
            className="from"
            onClick={afterSubmitButtonClick}
          >
            Sumbit
          </button>
        </div>
      </div>
      <div className={(loginDetails.length)?"table-responsive py-5":'py-5'}>
           <table id='thead'className="table  table-bordered" >
           {((loginDetails.length)!=0)?<thead class='' className=" text-center " >
                  <tr>
                    <th rowspan="2">S NO</th>
                    <th rowspan="2">Name</th>
                    <th rowspan="2">Email</th>
                    <th rowspan="2">Password</th>
                    <th colspan="4">Domain</th>
                    <th colspan="2">Gender</th>
                    <th rowspan="2"> Action</th>
                  </tr>
                  <tr>
                    <th>FullStack Web Development</th>
                    <th>Data Science</th>
                    <th>Data Analyst</th>
                    <th>App Developer</th>
                    <th>Male</th>
                    <th>Female</th>
                  </tr>
                </thead>
            :''}
        {loginDetails.map((values, i) => (
                <tbody  className="text-center bg-success">
                <tr>
                  <td>{i+1}</td>
                  <td>{values.userName}</td>
                  <td>{values.email}</td>
                  <td>{values.password}</td>
                  <td>
                    {values.domain == "FullStack Web Development" ? (
                      <input
                        name={"domain" + `${i}`}
                        type="radio"
                        value="FullStack Web Development"
                        checked={values.domain}
                      />
                    ) : (
                     <input type='radio' disabled name={"domain" + `${i}`} />
                    )}
                  </td>
                  <td>
                    {values.domain == "Data Analyst" ? (
                      <input
                        name={"domain" + `${i}`}
                        type="radio"
                        value="Data Analyst"
                        checked={values.domain}
                      />
                    ) : (
                      <input type='radio' disabled name={"domain" + `${i}`} />
                    )}
                  </td>
                  <td>
                    {values.domain == "Data Science" ? (
                      <input
                        name={"domain" + `${i}`}
                        type="radio"
                        value="Data Science"
                        checked={values.domain}
                      />
                    ) : (
                      <input type='radio' disabled name={"domain" + `${i}`} />
                    )}
                  </td>
                  <td>
                    {values.domain == "App Developer" ? (
                      <input
                        name={"domain" + `${i}`}
                        type="radio"
                        value="App Developer"
                        checked={values.domain}
                      />
                    ) : (
                      <input type='radio' disabled name={"domain" + `${i}`} />
                    )}
                  </td>
                  <td>
                    {console.log(values.gender)}
                    {values.gender == "Male" ? (
                      <input
                        name={"gender" +`${i}`}
                        type="radio"
                        value="Male"
                        checked={values.gender}
                      />
                    ) : (
                      <input type="radio" disabled name={"gender"+`${i}`}/>
                    )}
                  </td>
                  <td>
                    {values.gender == "Female" ? (
                      <input
                        name={"gender"+`${i}`}
                        type="radio"
                        value="Female"
                        checked={values.gender}
                      />
                    ) : (
                      <input type="radio" disabled name={"gender"+`${i}`} />
                    )}
                  </td>
                  <td>
                    <a
                      onClick={() => Edit(i)}
                      className="edit"
                      href="#form"
                      class="me-2"
                    ><CiEdit />
                    </a>
                    <a class="ms-2 " href="#">
                      <span onClick={() => Delete(i)}>
                        <MdDelete />
                      </span>
                    </a>
                  </td>
                </tr>
              </tbody>      
        ))}
       </table>  
      </div>
    </div>
  );
}
export default Table;

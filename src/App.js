// with useReducer hook

import React, { useState, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

// Define the reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, userName: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_ROLLNO":
      return { ...state, rollNo: action.payload };
    case "SET_CLASSNAME":
      return { ...state, className: action.payload };
    default:
      return state;
  }
};

const initialState = {
  userName: "",
  email: "",
  rollNo: "",
  className: "",
};

const data = [
  {
    uid: uuidv4(),
    name: "Babar",
    email: "babar@gmail.com",
    rollNo: 234234,
    className: "web and mobile",
  },

  {
    uid: uuidv4(),
    name: "Azam",
    email: "azam@gmail.com",
    rollNo: 2342002334,
    className: "web and mobile",
  },
];

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: name, payload: value });
  };

  const [students, setStudents] = useState(data);

  const [isUpdate, setIsUpdate] = useState(false);
  const [updateUid, setUpdateUid] = useState(0);

  const onSubmitHandler = () => {
    console.log("submit button clicked");
    if (!state.userName || !state.email || !state.rollNo || !state.className) {
      alert("All inputs are required");
      return;
    }

    // do some logic with the form data
    console.log(
      "Values",
      state.userName,
      state.email,
      state.rollNo,
      state.className
    );

    let student = {
      uid: uuidv4(),
      name: state.userName,
      email: state.email,
      rollNo: state.rollNo,
      className: state.className,
    };

    setStudents([...students, student]);
    dispatch({ type: "SET_USERNAME", payload: "" });
    dispatch({ type: "SET_EMAIL", payload: "" });
    dispatch({ type: "SET_ROLLNO", payload: "" });
    dispatch({ type: "SET_CLASSNAME", payload: "" });
  };

  const onDeleteHandler = (uid) => {
    console.log("email", uid);

    let newStudents = students.filter((student) => student.uid !== uid);

    setStudents(newStudents);
  };

  const onUpdateHandler = (item, index) => {
    console.log(item);
    dispatch({ type: "SET_USERNAME", payload: item.name });
    dispatch({ type: "SET_EMAIL", payload: item.email });
    dispatch({ type: "SET_ROLLNO", payload: item.rollNo });
    dispatch({ type: "SET_CLASSNAME", payload: item.className });
    setUpdateUid(item.uid);
    setIsUpdate(true);
  };

  const onCtaUpdate = () => {
    console.log("onCtaUpdate");

    let student = {
      name: state.userName,
      email: state.email,
      rollNo: state.rollNo,
      className: state.className,
    };

    let newStudents = students.map((item) => {
      if (item.uid === updateUid) {
        return student;
      } else {
        return item;
      }
    });

    setStudents(newStudents);

    dispatch({ type: "SET_USERNAME", payload: "" });
    dispatch({ type: "SET_EMAIL", payload: "" });
    dispatch({ type: "SET_ROLLNO", payload: "" });
    dispatch({ type: "SET_CLASSNAME", payload: "" });
    setIsUpdate(false);
  };

  return (
    <div>
      <h1>Student SignUp Form</h1>
      <div>
        Name:{" "}
        <input
          onChange={handleInputChange}
          value={state.userName}
          placeholder="enter your name"
          type="text"
          name="SET_USERNAME"
        />{" "}
      </div>
      <div>
        Email:{" "}
        <input
          onChange={handleInputChange}
          value={state.email}
          placeholder="enter your Email"
          type="text"
          name="SET_EMAIL"
        />{" "}
      </div>
      <div>
        Roll No.:{" "}
        <input
          onChange={handleInputChange}
          value={state.rollNo}
          placeholder="enter your Roll No."
          type="text"
          name="SET_ROLLNO"
        />{" "}
      </div>
      <div>
        Class:{" "}
        <input
          onChange={handleInputChange}
          value={state.className}
          placeholder="enter your Class"
          type="text"
          name="SET_CLASSNAME"
        />{" "}
      </div>
      {isUpdate ? (
        <button onClick={onCtaUpdate}>Update</button>
      ) : (
        <button onClick={onSubmitHandler}>Submit</button>
      )}

      <h1>List of Students</h1>

      <table>
        <thead>
          <tr className="customTable">
            <th>No.</th>
            <th>UID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Roll No.</th>
            <th>Class</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((item, index) => {
            return (
              <tr key={item.uid} className="customTable">
                <td>{index + 1}</td>
                <td>{item.uid}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.rollNo}</td>
                <td>{item.className}</td>
                <td>
                  <button onClick={() => onDeleteHandler(item.uid)}>
                    Delete
                  </button>
                  <button onClick={() => onUpdateHandler(item)}>Update</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;

// without useReducer hook

// import React, { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
// import "./App.css";

// const data = [
//   {
//     uid: uuidv4(),
//     name: "naveed",
//     email: "learnwithnaveedsarwar@gmail.com",
//     rollNo: 234234,
//     className: "web and mobile",
//   },

//   {
//     uid: uuidv4(),
//     name: "Umar",
//     email: "umar@gmail.com",
//     rollNo: 2342002334,
//     className: "web and mobile",
//   },

//   {
//     uid: uuidv4(),
//     name: "Ali",
//     email: "Ali@gmail.com",
//     rollNo: 23,
//     className: "web and mobile",
//   },
// ];

// function App() {
//   const [userName, setUserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [rollNo, setRollNo] = useState("");
//   const [className, setClassName] = useState("");

//   const [students, setStudents] = useState(data);

//   const [isUpdate, setIsUpdate] = useState(false);
//   const [updateUid, setUpdateUid] = useState(0);

//   const onChangeNameHandler = (e) => {
//     console.log("event---", e.target.value);
//     setUserName(e.target.value);
//   };

//   const onSubmitHandler = () => {
//     console.log("submit button clicked");
//     if (!userName || !email || !rollNo || !className) {
//       alert("All inputs are required");
//       return;
//     }

//     // do some logics with the form data
//     console.log("Values", userName, email, rollNo, className);

//     let student = {
//       uid: uuidv4(),
//       name: userName,
//       email: email,
//       rollNo: rollNo,
//       className: className,
//     };

//     setStudents([...students, student]);
//     setClassName("");
//     setUserName("");
//     setRollNo("");
//     setEmail("");
//   };

//   const onDeleteHandler = (uid) => {
//     console.log("email", uid);

//     let newStudents = students.filter((student) => student.uid !== uid);

//     setStudents(newStudents);
//   };

//   const onUpdateHandler = (item, index) => {
//     setClassName(item.className);
//     setUserName(item.name);
//     setRollNo(item.rollNo);
//     setEmail(item.email);
//     setUpdateUid(item);
//     setIsUpdate(true);
//   };

//   const onCtaUpdate = () => {
//     console.log("onCtaUpdate");

//     let student = {
//       name: userName,
//       email: email,
//       rollNo: rollNo,
//       className: className,
//     };

//     let newStudents = students.map((item, index) => {
//       if (item.uid === updateUid) {
//         return student;
//       } else {
//         return item;
//       }
//     });

//     setStudents(newStudents);

//     setClassName("");
//     setUserName("");
//     setRollNo("");
//     setEmail("");
//     setIsUpdate(false);
//   };

//   return (
//     <div>
//       <h1>Student SignUp Form</h1>
//       <div>
//         Name:{" "}
//         <input
//           onChange={(e) => setUserName(e.target.value)}
//           value={userName}
//           placeholder="enter your name"
//           type="text"
//         />{" "}
//       </div>
//       <div>
//         Email:{" "}
//         <input
//           onChange={(e) => setEmail(e.target.value)}
//           value={email}
//           placeholder="enter your Email"
//           type="text"
//         />{" "}
//       </div>
//       <div>
//         Roll No.:{" "}
//         <input
//           onChange={(e) => setRollNo(e.target.value)}
//           value={rollNo}
//           placeholder="enter your Roll No."
//           type="text"
//         />{" "}
//       </div>
//       <div>
//         Class:{" "}
//         <input
//           onChange={(e) => setClassName(e.target.value)}
//           value={className}
//           placeholder="enter your Class"
//           type="text"
//         />{" "}
//       </div>
//       {isUpdate ? (
//         <button onClick={onCtaUpdate}>Update</button>
//       ) : (
//         <button onClick={onSubmitHandler}>Submit</button>
//       )}

//       <h1>List of Students</h1>

//       <table>
//         <tr className="customTable">
//           <th>No.</th>
//           <th>UID</th>
//           <th>Name</th>
//           <th>Email</th>
//           <th>Roll No.</th>
//           <th>Class</th>
//           <th>Actions</th>
//         </tr>

//         {students.map((item, index) => {
//           return (
//             <tr key={index} className="customTable">
//               <td>{index + 1}</td>
//               <td>{item.uid}</td>
//               <td>{item.name}</td>
//               <td>{item.email}</td>
//               <td>{item.rollNo}</td>
//               <td>{item.className}</td>
//               <td>
//                 <button onClick={() => onDeleteHandler(item.uid)}>
//                   Delete
//                 </button>
//                 <button onClick={() => onUpdateHandler(item, index)}>
//                   Update
//                 </button>
//               </td>
//             </tr>
//           );
//         })}
//       </table>
//     </div>
//   );
// }

// export default App;

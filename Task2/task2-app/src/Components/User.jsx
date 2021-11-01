import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const User = () => {
  const [data, setData] = useState([]);

  var newdata = [...data];
  const formatdate = (stringdate) => {
    var date = new Date(stringdate); // dateStr you get from mongodb

    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    var h = date.getHours();
    var mi = date.getMinutes();

    return {
      day: d,
      month: m,
      year: y,
      hours: h,
      minute: mi,
    };
  };
  useEffect(() => {
    //Call api
    axios
      .get("http://localhost:4000/users/get")
      .then((response) => {
        return response;
      })
      .then((data) => {
        if (data.status == 200) {
          setData(data.data.data);
        }
      });
  }, []);

  const handleValue = (e, indx, field) => {
    if (field == 0) {
      newdata[indx]["username"] = e.target.value;
    }
    if (field == 2) {
      newdata[indx]["birthdate"] = e.target.value;
    }
    if (field == 1) {
      newdata[indx]["email"] = e.target.value;
    }
  };

  const clickupdate = () => {
    axios
      .post("http://localhost:4000/users/update", newdata)
      .then((response) => {
        return response;
      })
      .then((res) => {
        if (res.data.status == 200) {
          console.log(res);
          setData(newdata);
          alert(res.data.message);
        }
      });
  };

  return (
    <div style={{ width: "100%" }} className="flex jus-center">
      <table>
        <tr>
          <th>ID</th>
          <th>USERNAME</th>
          <th>EMAIL</th>
          <th>BIRTHDATE</th>
          <th
            onClick={() => clickupdate()}
            className="flex jus-center updatebtn"
            style={{
              color: "#b2e3b2",
              backgroundColor: "black",
              cursor: "pointer",
            }}
          >
            Update User
          </th>
        </tr>
        {data.length > 0
          ? data.map((data, index) => {
              return (
                <tr>
                  <td>{data._id}</td>
                  <td>
                    <input
                      style={{
                        width: "50%",
                        padding: "5px",
                        outlineStyle: "none",
                        fontSize: "16px",
                        fontWeight: "500",
                      }}
                      onChange={(e) => handleValue(e, index, 0)}
                      placeholder={data.username}
                    ></input>
                  </td>
                  <td>
                    <input
                      style={{
                        width: "50%",
                        padding: "5px",
                        outlineStyle: "none",
                        fontSize: "16px",
                        fontWeight: "500",
                      }}
                      onChange={(e) => handleValue(e, index, 1)}
                      placeholder={data.email}
                    />
                  </td>
                  <td>
                    <input
                      onChange={(e) => handleValue(e, index, 2)}
                      style={{
                        width: "50%",
                        padding: "5px",
                        outlineStyle: "none",
                        fontSize: "16px",
                        fontWeight: "500",
                      }}
                      placeholder={`${formatdate(data.birthdate).year}- ${
                        formatdate(data.birthdate).month
                      } ${formatdate(data.birthdate).day}     `}
                    />
                  </td>
                </tr>
              );
            })
          : null}
      </table>
    </div>
  );
};

export default User;

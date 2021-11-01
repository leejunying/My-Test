import React, { useContext } from "react";
import { useState, useEffect } from "react";
import CenteredTree from "./tree";
import axios from "axios";

import UsersContext from "../Context/Globalstate";
const List = () => {
  const Seclecteduser = useContext(UsersContext);
  const [list, setList] = useState([]);
  const [add, setAdd] = useState(0);
  const [input, setInput] = useState("");
  const [select, setSelect] = useState(0);

  const isselect = {
    background: "burlywood",
    border: "1px solid black",
  };
  const isnot = {
    backgroundCorlor: "white",

    border: "1px solid black",
  };

  useEffect(() => {
    //fetch data

    axios
      .get(`http://localhost:4000/users/get`)
      .then((response) => {
        return response;
      })
      .then((data) => {
        console.log(data);
        if (data.data.status == 200) {
          setList([...data.data.data]);

          console.log(list);
        }
      });
  }, []);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const save = () => {
    let obj = JSON.parse(input);

    console.log(obj);

    if (obj != undefined)
      axios
        .post(`http://localhost:4000/users/add`, obj)
        .then((response) => {
          return response;
        })
        .then((data) => {
          if (data.data.status == 200);
          {
            setList([...list, data.data.data]);
            setAdd(0);
          }
        });
  };

  console.log(list);

  const selected = (indx, data) => {
    Seclecteduser.setSelected(data);

    console.log(indx);
    setSelect(indx);
  };

  const Delete = () => {
    axios
      .post("http://localhost:4000/users/delete", {
        _id: Seclecteduser.selected._id,
      })
      .then((res) => {
        return res;
      })
      .then((res) => {
        if (res.data.status == 200) {
          Seclecteduser.setSelected({});

          let found = list.filter(
            (data) => data._id != Seclecteduser.selected._id
          );

          let copy = [...list];
          copy = found;
          setList(copy);
        }
      });
  };

  return (
    <div style={{ width: "100%" }} className="flex ">
      <div style={{ width: "20%", border: "1px solid black" }}>
        <div>LIST USER</div>
        <div style={{ width: "100%" }} className="flex">
          {" "}
          <button
            onClick={() => setAdd(1)}
            style={{
              cursor: "pointer",

              outlineStyle: "none",
              margin: "2px",
              width: "50%",
            }}
          >
            ADD
          </button>
          <button
            onClick={() => Delete()}
            style={{
              cursor: "pointer",

              outlineStyle: "none",
              margin: "2px",
              width: "50%",
            }}
          >
            DELETE
          </button>
        </div>
        {add == 1 ? (
          <div className="flex jus-center col ">
            <textarea
              placeholder={"Past your json here"}
              onChange={(e) => handleInput(e)}
              cols={10}
              rows={20}
              style={{
                width: "90%",
                fontSize: "14px",
                outlineStyle: "none",
                marginLeft: "10px",
              }}
            />
            <div>
              <button
                onClick={() => save()}
                style={{
                  cursor: "pointer",
                  width: "50px",
                  height: "50px",
                  marginLeft: "10px",
                }}
              >
                SAVE
              </button>

              <button
                style={{
                  cursor: "pointer",
                  width: "100px",
                  height: "50px",
                  marginLeft: "10px",
                }}
                onClick={() => {
                  setAdd(0);
                }}
              >
                CANCLE
              </button>
            </div>
          </div>
        ) : null}
        <div>
          {list.length > 0
            ? list.map((data, indx) => {
                return (
                  <div
                    onClick={() => selected(indx, data)}
                    style={select === indx ? isselect : isnot}
                    key={indx}
                    className="list-row"
                  >
                    <h3>{data.username}</h3>
                  </div>
                );
              })
            : null}
        </div>
      </div>
      <div style={{ width: "80%" }}>
        <CenteredTree></CenteredTree>
      </div>
    </div>
  );
};

export default List;

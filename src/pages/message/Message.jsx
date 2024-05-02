import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Message.css";
import chatbackpic from "../../assets/360_F_327515607_Hcps04aaEc7Ki43d1XZPxwcv0ZaIaorh.jpg";
const Message = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();
  const messagesRef = useRef(null);
  const {
    isLoading,
    error,
    data: messages,
  } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
    // config: {
    refetchInterval: 500, // 0.5 seconds
    // }
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };
  useEffect(() => {
    // Scroll to the bottom of the messages container when messages change
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> {">"}
        </span>
        {isLoading ? (
          "loading"
        ) : error ? (
          "error"
        ) : (
          <div className="messages" ref={messagesRef}>
            {messages.map((m) => (
              <div
                className={m.userId === currentUser._id ? "owner item" : "item"}
                key={m._id}
              >
                {m.userId === currentUser._id ? <img
                  src="http://res.cloudinary.com/dqc0px7bg/image/upload/v1714586714/worknest/azssskwdcui1sldonzpo.jpg"
                  alt=""
                /> : <img
                src="http://res.cloudinary.com/dqc0px7bg/image/upload/v1714575559/worknest/rnmlplap55ac50wp17pj.jpg"
                alt=""
              />}
                {/* <img
                  src="http://res.cloudinary.com/dqc0px7bg/image/upload/v1714575559/worknest/rnmlplap55ac50wp17pj.jpg"
                  alt=""
                /> */}
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        )}
        <hr className="hrline" />
        <form className="write" onSubmit={handleSubmit}>
          <textarea
            type="text"
            placeholder="write a message"
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;

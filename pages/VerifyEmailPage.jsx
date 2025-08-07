import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function VerifyEmailPage() {
  const [message, setMessage] = useState("Verifying...");
  const navigate = useNavigate();
//   const token = new URLSearchParams(window.location.search).get("token");

  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if (token) {
    fetch(`https://api.interactivv.pro/admin/verify-email?token=${token}`)
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        setTimeout(() => {
            navigate('/auth'); // or '/login' depending on your route
          }, 2000);
      })
      .catch(err => {
        alert("Verification failed or link expired.");
      });
  }
}, []);
  return (
    <div className="text-center mt-20 text-xl text-gray-800">
      {message}
    </div>
  );
}

export default VerifyEmailPage;

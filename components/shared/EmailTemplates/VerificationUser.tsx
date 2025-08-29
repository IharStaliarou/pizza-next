import React from 'react';

interface IVerificationUserTemplateProps {
  code: string;
}

export const VerificationUserTemplate: React.FC<
  IVerificationUserTemplateProps
> = ({ code }) => (
  <div>
    <p>
      Approve your registration: <h2>{code}</h2>
    </p>

    <p>
      <a href={`http://localhost:3000/api/auth/verify?code=${code}`}>Approve</a>
    </p>
  </div>
);

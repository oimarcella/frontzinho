import { useState } from "react";

type ReCaptchaPropsT = {
    siteKey: string;
    onVerify:(token: string | null) => void;
}

const ReCaptcha:React.FC<ReCaptchaPropsT> = ({siteKey, onVerify})=>{

    const [token, setToken] = useState<string | null>(null);

    const handleChange = (value: string | null) => {
      setToken(value);
      onVerify(value);
    };
    
    return (
        <div className="g-recaptcha" data-sitekey={siteKey} data-callback={handleChange}></div>
    );
}

export default ReCaptcha;
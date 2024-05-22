import { useState, useEffect } from "react";
import { isValidEmail } from "../utilities";

export default function Checkout({ onSubmit, disabled }) {
    const [isValidationShown, setIsValidationShown] = useState(false)
    const [email, setEmail] = useState("")

    const isValid = isValidEmail(email);
    const isInvalid = isValidationShown && !isValid;
    const isValidFeedback = isValidationShown && isValid;

    useEffect(() => {
        if (isValid) {
            setIsValidationShown(true)
        }
    }, [isValid]);

    const handleSubmitHandler = (e) => {
        e.preventDefault(); // Prevents default form behavior

        if (isValid) {
            onSubmit(email);
            console.log("Sending email:", email);
        } else {
            console.log("Please enter a valid email address!");
        }
    }

    return (
        <section className="my-4">
            <form onSubmit={handleSubmitHandler} noValidate> {/* noValidate = Prevents default form behavior */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        id="email"
                        className={`form-control ${isInvalid ? 'is-invalid' : isValidFeedback ? 'is-valid' : ''}`}
                        placeholder="example@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={disabled}
                    />
                    {!email && <div className="form-text">Please enter your email address.</div>}
                    {isInvalid && <div className="invalid-feedback">Please enter a valid email address.</div>}
                    {isValidFeedback && <div className="valid-feedback">Email address looks good.</div>}
                </div>
                <button
                    type="submit"
                    id="submitBtn"
                    className="btn btn-primary btn-lg"
                    disabled={disabled}
                >
                    Place order
                </button>
            </form>
        </section>
    )
}

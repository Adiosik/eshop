import React from "react";

export default function Checkout({ onSubmit }) {
    const [isValidationShown, setIsValidationShown] = React.useState(false)
    const [email, setEmail] = React.useState("")

    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email); // Regulární výraz pro platnost e-mailu (@, ., .cz)

    // Zavolá setIsValidationShown(true), pokud je email platný
    React.useEffect(() => {
        if(isValid) {
            setIsValidationShown(true)
        }
    }, [isValid]);

    // Funkce pro ověření platnosti e-mailu
    const onSubmitHandler = (e) => {
        e.preventDefault(); // Zabrání výchozímu chování formuláře

        if (isValid) {
            onSubmit(email); // Zavolá funkci pro odeslání objednávky
            console.log("Sending email:", email);
        } else {
            console.log("Please enter a valid email address!");
        }
    }

    return (
        <section className="my-4">
            <form onSubmit={onSubmitHandler} noValidate> {/* noValidate = Zabraňuje výchozímu chování prohlížeče */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input 
                        type="email" 
                        id="email"
                        className={`form-control ${isValidationShown && !isValid ? 'is-invalid' : isValid && isValidationShown ? 'is-valid' : ''}`} // Přidá is-invalid/invalid, podle validace e-mail
                        placeholder="example@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {/* Zpráva, když není nic zadáno */}
                    {!email && <div className="form-text">Please enter your email address.</div>}
                    {/* Zobrazení zprávy na základě stavu isValid */}
                    {isValidationShown && !isValid && <div className="invalid-feedback">Please enter a valid email address.</div>}
                    {isValidationShown && isValid && <div className="valid-feedback">Email address looks good.</div>}
                </div>
                <button type="submit" id="submitBtn" className="btn btn-primary btn-lg">Place order</button>
            </form>
        </section>
    )
}

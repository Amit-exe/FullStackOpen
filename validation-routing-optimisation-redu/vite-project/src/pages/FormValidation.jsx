import { useState } from "react";
import { useForm } from "react-hook-form";

// ── Helpers ──────────────────────────────────────────────────────────────────
function validate(values) {
  const errors = {};
  if (!values.name?.trim()) errors.name = "Name is required";
  if (!values.email?.trim()) errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(values.email))
    errors.email = "Enter a valid email";
  if (!values.password) errors.password = "Password is required";
  else if (values.password.length < 8) errors.password = "Minimum 8 characters";
  return errors;
}

// ── Sub-section 1: Controlled + submit-time validation ───────────────────────
function SubmitForm() {
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
    setSuccess(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSuccess(true);
  }

  return (
    <div className="card">
      <div className="card-title">① Submit-time validation</div>
      <p className="section-desc">
        Errors only appear after you click Submit. State is managed with{" "}
        <code>useState</code>; every input is controlled via{" "}
        <code>value + onChange</code>.
      </p>

      {success && <div className="alert alert-success">✓ Form submitted!</div>}

      <form onSubmit={handleSubmit} noValidate>
        {[
          {
            label: "Name",
            name: "name",
            type: "text",
            placeholder: "Jane Doe",
            autocomplete: "name",
          },
          {
            label: "Email",
            name: "email",
            type: "email",
            placeholder: "jane@example.com",
            autocomplete: "email",
          },
          {
            label: "Password",
            name: "password",
            type: "password",
            placeholder: "Min 8 chars",
            autocomplete: "current-password",
          },
        ].map(({ label, name, type, placeholder, autocomplete }) => (
          <div className="form-group" key={name}>
            <label>{label}</label>
            <input
              type={type}
              name={name}
              placeholder={placeholder}
              autoComplete={autocomplete}
              value={values[name]}
              onChange={handleChange}
              className={errors[name] ? "input-error" : ""}
            />
            <p className="error-msg">{errors[name]}</p>
          </div>
        ))}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

// ── Sub-section 2: Blur (touched) validation ─────────────────────────────────
function BlurForm() {
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  const errors = validate(values);

  // Show error only if field was touched OR the form was already submitted once
  function showError(field) {
    return touched[field] || submitted ? errors[field] : undefined;
  }

  function handleBlur(e) {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
  }

  function handleChange(e) {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
    setSuccess(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length === 0) setSuccess(true);
  }

  return (
    <div className="card">
      <div className="card-title">② Blur (hybrid) validation</div>
      <p className="section-desc">
        Errors appear when you leave a field (<code>onBlur</code>), but only
        after the first submit attempt. Best UX — not noisy upfront.
      </p>

      {success && <div className="alert alert-success">✓ Form submitted!</div>}

      <form onSubmit={handleSubmit} noValidate>
        {[
          {
            label: "Name",
            name: "name",
            type: "text",
            placeholder: "Jane Doe",
            autoComplete: "name",
          },
          {
            label: "Email",
            name: "email",
            type: "email",
            placeholder: "jane@example.com",
            autoComplete: "email",
          },
          {
            label: "Password",
            name: "password",
            type: "password",
            placeholder: "Min 8 chars",
            autoComplete: "password",
          },
        ].map(({ label, name, type, placeholder, autoComplete }) => (
          <div className="form-group" key={name}>
            <label>{label}</label>
            <input
              type={type}
              name={name}
              placeholder={placeholder}
              value={values[name]}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete={autoComplete}
              className={showError(name) ? "input-error" : ""}
            />
            <p className="error-msg">{showError(name)}</p>
          </div>
        ))}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

// ── Sub-section 3: React Hook Form ───────────────────────────────────────────
function HookForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, touchedFields },
  } = useForm({ mode: "onBlur" });

  function onSubmit(data) {
    console.log("RHF data:", data);
    // reset() clears the form after successful submit
    setTimeout(reset, 1500);
  }

  return (
    <div className="card">
      <div className="card-title">③ React Hook Form</div>
      <p className="section-desc">
        <code>register()</code> replaces <code>value + onChange + onBlur</code>.
        RHF uses uncontrolled inputs under the hood — no re-render on every
        keystroke. Rules live inline on each field.
      </p>

      {isSubmitSuccessful && (
        <div className="alert alert-success">
          ✓ RHF submitted! Check the console.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Jane Doe"
            className={errors.name ? "input-error" : ""}
            {...register("name", { required: "Name is required" })}
            autoComplete="name"
          />
          <p className="error-msg">{errors.name?.message}</p>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="jane@example.com"
            autoComplete="email"
            className={errors.email ? "input-error" : ""}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Enter a valid email",
              },
            })}
          />
          <p className="error-msg">{errors.email?.message}</p>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Min 8 chars"
            autoComplete="password"
            className={errors.password ? "input-error" : ""}
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Minimum 8 characters" },
            })}
          />
          <p className="error-msg">{errors.password?.message}</p>
        </div>

        <div className="form-group">
          <label>Website (optional, URL format)</label>
          <input
            type="url"
            placeholder="https://example.com"
            className={errors.website ? "input-error" : ""}
            {...register("website", {
              pattern: {
                value: /^https?:\/\/.+/,
                message: "Must start with http:// or https://",
              },
            })}
          />
          <p className="error-msg">{errors.website?.message}</p>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit with RHF
        </button>
      </form>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function FormValidation() {
  return (
    <div className="page">
      <h1 className="page-title">📋 Form Validation</h1>
      <p className="page-subtitle">
        Three approaches — from raw <code>useState</code> to React Hook Form.
        Each form is fully independent. Try breaking them!
      </p>

      <div className="alert alert-info">
        <strong>Key concept:</strong> a <em>controlled input</em> has its value
        driven by React state (
        <code>
          value={"{"}state{"}"}
        </code>{" "}
        + <code>onChange</code>). The DOM never owns the value — React does.
      </div>

      <div className="section">
        <SubmitForm />
        <BlurForm />
        <HookForm />
      </div>
    </div>
  );
}

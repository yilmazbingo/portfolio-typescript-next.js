import DatePicker from "react-datepicker";
import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Inputs {
  title: string;
  company: string;
  companyWebsite: string;
  location: string;
  jobTitle: string;
  description: string;
  startDate: Date;
  endDate: Date;
}
// interface Inputs {
//   title?: string;
//   company?: string;
//   companyWebsite?: string;
//   location?: string;
//   jobTitle?: string;
//   description?: string;
//   startDate?: Date;
//   endDate?: Date;
// }
interface PortfolioProps {
  onSubmit: SubmitHandler<
    | ((data: any[]) => Promise<any>)
    | {
        error: null;
        data: null;
        loading: boolean;
      }
  >;
  initialData?: Inputs;
}

const PortfolioForm: React.FC<PortfolioProps> = ({
  onSubmit,
  initialData = {},
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { register, handleSubmit, setValue } = useForm<Inputs>({
    defaultValues: initialData,
  });

  //we cannot pass "ref" to datePicker fields. we register the datePicker fields
  // this will be set when component is loaded and also when "register" is available
  useEffect(() => {
    register({ name: "startDate" }, { required: true });
    register({ name: "endDate" }, { required: true });
  }, [register]);

  useEffect(() => {
    const { startDate, endDate } = initialData;
    if (startDate) {
      setStartDate(new Date(startDate));
    }
    if (endDate) {
      setEndDate(new Date(endDate));
    }
  }, [initialData]);

  //dateType is "startDate" or "EndDate"
  const handleDateChange = (
    dateType: "startDate" | "endDate",
    setDate: typeof setStartDate | typeof setEndDate
  ) => (date: Date | null) => {
    setValue(dateType, date);
    setDate(date);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          required
          ref={register}
          name="title"
          type="text"
          className="form-control"
          id="title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="city">Company</label>
        <input
          ref={register}
          name="company"
          type="text"
          className="form-control"
          id="company"
        />
      </div>

      <div className="form-group">
        <label htmlFor="city">Company Website</label>
        <input
          ref={register}
          name="companyWebsite"
          type="text"
          className="form-control"
          id="companyWebsite"
        />
      </div>

      <div className="form-group">
        <label htmlFor="street">Location</label>
        <input
          ref={register}
          name="location"
          type="text"
          className="form-control"
          id="location"
        />
      </div>

      <div className="form-group">
        <label htmlFor="street">Job Title</label>
        <input
          ref={register}
          name="jobTitle"
          type="text"
          className="form-control"
          id="jobTitle"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          ref={register}
          name="description"
          rows={5}
          className="form-control"
          id="description"
        ></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="startDate">Start Date</label>
        <div>
          <DatePicker
            showYearDropdown
            selected={startDate}
            onChange={handleDateChange("startDate", setStartDate)}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="endDate">End Date</label>
        <div>
          <DatePicker
            disabled={!endDate}
            showYearDropdown
            selected={endDate}
            onChange={handleDateChange("endDate", setEndDate)}
          />
        </div>
      </div>
      <div className="form-group">
        {endDate && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleDateChange("endDate", setEndDate)(null)}
          >
            No End Date
          </button>
        )}
        {!endDate && (
          <button
            type="button"
            className="btn btn-success"
            // we need to return a callback function for onCLick
            onClick={() =>
              handleDateChange(
                "endDate",
                setEndDate
              )(new Date(new Date().setHours(0, 0, 0, 0)))
            }
          >
            Set End Date
          </button>
        )}
      </div>
      <button type="submit" className="btn btn-primary">
        Create
      </button>
    </form>
  );
};

export default PortfolioForm;

// Partial<T> : any sub keys of T
// Omit<T, 'x'> : all keys of T except the key x
// Pick<T, 'x'|'y'| 'z'> : Exactly x, y, z keys from T

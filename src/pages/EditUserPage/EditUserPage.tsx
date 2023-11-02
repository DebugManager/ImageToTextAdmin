import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Select, { StylesConfig } from "react-select";
import { toast } from "react-toastify";
import { CircleLoader } from "react-spinners";

import styles from "./EditUserPage.module.css";
import { useCallback, useEffect, useState } from "react";
import { editAdminUserById, getUserById } from "../../services/user.service";

const myCustomStyles = {
  background: "rgba(0, 0, 0, 0.8)",
  color: "#fff",
};

const progressBarStyles = {
  background: "#556EE6",
};

const CustomCheckmark = () => <div style={{ color: "#556EE6" }}>✔</div>;

const CustomErrorIcon = () => <div style={{ color: "red" }}>✘</div>;

const typeOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

const popularCountryOptions = [
  { value: "china", label: "China" },
  { value: "india", label: "India" },
  { value: "united_states", label: "United States" },
  { value: "indonesia", label: "Indonesia" },
  { value: "pakistan", label: "Pakistan" },
  { value: "brazil", label: "Brazil" },
  { value: "nigeria", label: "Nigeria" },
  { value: "bangladesh", label: "Bangladesh" },
  { value: "mexico", label: "Mexico" },
];

const customStyles: StylesConfig = {
  control: (provided, state) => ({
    ...provided,
    height: "24px",
    display: "flex",
    padding: "5px 10px",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "4px",
    border: "1px solid var(--text-color-20, #EFF2F7)",
    background: "var(--text-color-10, #FFF)",
    minHeight: "none",
    fontSize: "7px",
    boxShadow: "none",
    "&:hover": {
      borderColor: "none",
    },
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    padding: "0 6px",
    fontSize: "7px",
  }),

  input: (provided, state) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorSeparator: (state) => ({
    display: "none",
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: "8px",
    width: "8px",
  }),

  dropdownIndicator: (styles) => ({
    ...styles,
    height: "8px",
    width: "8px",
    padding: "0px",
    marginBottom: "5px",
    fontSize: "7px",
  }),

  option: (styles, state) => ({
    ...styles,
    backgroundColor: state.isSelected ? "#EFF2F7" : "",
    color: "#495057",
    fontSize: "7px",
    "&:hover": {
      ...styles,
      backgroundColor: "#EFF2F7",
      fontSize: "7px",
      color: "#495057",
    },
  }),
};

interface ICreateUser {
  id: number | string;
  first_name: string;
  last_name: string;
  email: string;
  password?: string | number;
  is_superuser?: boolean;
  is_staff?: boolean;
  user_permissions: number[];
  phone?: null | string;
  country: string;
  address_line1: string;
  affiliate: boolean;
}

const EditUserPage = () => {
  const { id } = useParams();

  const [user, setUser] = useState<null | ICreateUser>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createValidationSchema = Yup.object().shape({
    name: Yup.string(),
    email: Yup.string(),
    phone: Yup.string(),
    address: Yup.string(),
    country: Yup.object().shape({
      label: Yup.string(),
      value: Yup.string(),
    }),
    affiliate: Yup.object().shape({
      label: Yup.string(),
      value: Yup.string(),
    }),
  });

  const { control, handleSubmit, reset, setValue } = useForm({
    resolver: yupResolver(createValidationSchema),
  });

  const fetchData = useCallback(async (id: string | number) => {
    setIsLoading(true);
    try {
      const data = await getUserById(id);
      setUser(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error, "error");
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const nameParts = data.name.split(" ");

    const transformedData = {
      first_name: nameParts[0],
      last_name: nameParts[1],
      affiliate: data.affiliate.value === "yes" ? true : false,
      email: data.email,
      country: data.country.label,
      phone: data.phone,
    };
    console.log(data);

    if (user?.id) {
      const req = await editAdminUserById(transformedData, +user.id);
      if (req.id) {
        setIsLoading(false);
        toast.success("The company has been successfully created", {
          position: "top-right",
          autoClose: 3000,
          className: "my-custom-toast",
          style: myCustomStyles,
          progressClassName: "my-custom-progress-bar",
          progressStyle: progressBarStyles,
          icon: <CustomCheckmark />,
        });
      } else {
        toast.error("Something goes wrong", {
          position: "top-right",
          autoClose: 3000,
          className: "my-custom-toast-error",
          style: myCustomStyles,
          progressClassName: "my-custom-progress-bar",
          progressStyle: progressBarStyles,
          icon: <CustomErrorIcon />,
        });
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Edit User</p>
      {user?.id ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputWrapper}>
            <div>
              <label className={styles.label} htmlFor="name">
                Name
              </label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Name"
                    {...field}
                    defaultValue={
                      user?.first_name + " " + user?.last_name || ""
                    }
                  />
                )}
              />
            </div>

            <div className={styles.rightInput}>
              <label className={styles.label} htmlFor="email">
                Email
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Email"
                    defaultValue={user?.email || ""}
                    {...field}
                  />
                )}
              />
            </div>
          </div>

          <div className={styles.inputWrapper}>
            <div>
              <label className={styles.label} htmlFor="phone">
                Phone
              </label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Phone"
                    defaultValue={user?.phone || ""}
                    {...field}
                  />
                )}
              />
            </div>

            <div>
              <label className={styles.label} htmlFor="address">
                Address
              </label>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Address"
                    defaultValue={user?.address_line1 || ""}
                    {...field}
                  />
                )}
              />
            </div>
          </div>

          <div className={styles.inputWrapper}>
            <div className={styles.dropDownWrapper}>
              <p className={styles.label}>Country</p>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={popularCountryOptions}
                    styles={customStyles}
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption);
                    }}
                    placeholder="Select country"
                    value={{ value: user.country, label: user.country }}
                  />
                )}
              />
            </div>

            <div className={styles.dropDownWrapper}>
              <p className={styles.label}>Affiliate</p>
              <Controller
                name="affiliate"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={typeOptions}
                    styles={customStyles}
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption);
                    }}
                    placeholder="Select affiliate"
                    value={{ value: user.affiliate ? 'yes' : 'no', label: user.affiliate ? 'Yes' : 'No' }}
                  />
                )}
              />
            </div>
          </div>
          <div className={styles.btnWrapper}>
            <button className={styles.submitbtn} type="submit">
              {isLoading ? (
                <CircleLoader loading={isLoading} color={"#FFF"} size={10} />
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      ) : (
        <CircleLoader loading={isLoading} color={"#556EE6"} size={10} />
      )}
    </div>
  );
};

export default EditUserPage;

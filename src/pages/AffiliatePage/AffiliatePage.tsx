import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Select, { StylesConfig } from "react-select";
import { toast } from "react-toastify";
import { CircleLoader } from "react-spinners";

import {
  editAffiliate,
  getAffiliateById,
} from "../../services/affiliates.service";

import styles from "./AffiliatePage.module.css";
import { AffiliatesStatusEnums } from "../../enums/AffiliatesEnums";

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
  { value: AffiliatesStatusEnums.Success, label: "Approve" },
  { value: AffiliatesStatusEnums.Decline, label: "Decline" },
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
  control: (provided) => ({
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

  valueContainer: (provided) => ({
    ...provided,
    padding: "0 6px",
    fontSize: "7px",
  }),

  input: (provided) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  indicatorsContainer: (provided) => ({
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

type IAffiliates = {
  first_name: string;
  last_name: string;
  email: string;
  users_signed_up: string | number;
  sales: string | number;
  commission: string | number;
  status: boolean;
  country: string;
  created: string;
  id: string | number;
};

const AffiliatePage = () => {
  const { id } = useParams();

  const [affiliate, setAffiliate] = useState<null | IAffiliates>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createValidationSchema = Yup.object().shape({
    name: Yup.string(),
    email: Yup.string(),
    users_signed_up: Yup.string(),
    sales: Yup.string(),
    commision: Yup.string(),
    country: Yup.object().shape({
      label: Yup.string(),
      value: Yup.string(),
    }),
    status: Yup.object().shape({
      label: Yup.string(),
      value: Yup.string(),
    }),
    affiliate: Yup.object().shape({
      label: Yup.string(),
      value: Yup.string(),
    }),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(createValidationSchema),
  });

  const fetchData = useCallback(async (id: string | number) => {
    setIsLoading(true);
    try {
      const data = await getAffiliateById(id);
      setAffiliate(data);
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
    if (data.name && affiliate?.id) {
      console.log(data.status);
      const nameParts = data.name.split(" ");
      const transformedData = {
        affiliate_id: affiliate?.id,
        first_name: nameParts[0],
        last_name: nameParts[1],
        email: data.email,
        country: data.country.label,
        approved: data.status.value,
      };

      const req = await editAffiliate(transformedData);
      if (req.success === 200) {
        setIsLoading(false);
        toast.success("The affiliate has been successfully updated", {
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
    } else if (affiliate?.id && !data.name) {
      const transformedData = {
        affiliate_id: affiliate?.id,
        email: data.email,
        country: data.country.label,
        approved: data.status.value,
      };
      const req = await editAffiliate(transformedData);
      if (req.success === 200) {
        setIsLoading(false);
        toast.success("The affiliate has been successfully updated", {
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
      <p className={styles.title}>Edit Affiliate</p>
      {affiliate?.id ? (
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
                      affiliate?.first_name + " " + affiliate?.last_name || ""
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
                    defaultValue={affiliate?.email || ""}
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
                    placeholder={affiliate.country}
                  />
                )}
              />
            </div>

            <div>
              <label className={styles.label} htmlFor="signed_up">
                User Signed Up
              </label>
              <Controller
                disabled
                name="users_signed_up"
                control={control}
                render={({ field }) => (
                  <input
                    className={styles.input}
                    type="text"
                    placeholder=""
                    defaultValue={affiliate?.users_signed_up || ""}
                    {...field}
                  />
                )}
              />
            </div>
          </div>

          <div className={styles.inputWrapper}>
            <div>
              <p className={styles.label}>$ Sales</p>
              <Controller
                disabled
                name="sales"
                control={control}
                render={({ field }) => (
                  <input
                    className={styles.input}
                    type="text"
                    placeholder=""
                    defaultValue={affiliate?.sales || ""}
                    {...field}
                  />
                )}
              />
            </div>

            <div>
              <p className={styles.label}>Comission earned</p>
              <Controller
                disabled
                name="commision"
                control={control}
                render={({ field }) => (
                  <input
                    className={styles.input}
                    type="text"
                    placeholder=""
                    defaultValue={affiliate?.commission || ""}
                    {...field}
                  />
                )}
              />
            </div>
          </div>

          <div className={styles.inputWrapper}>
            <div className={styles.dropDownWrapper}>
              <p className={styles.label}>Status</p>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={typeOptions}
                    styles={customStyles}
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption);
                    }}
                    placeholder={affiliate.status}
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

export default AffiliatePage;

import { useGetAllClinicQuery } from "../../../redux/SliceApi/clinicApi";
import SectionClinic from "./sectionClinic";

const Clinic = () => {
  const { data, error, isLoading } = useGetAllClinicQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error occurred!</p>;
  return (
    <>
      <SectionClinic dataClinic={data} />
    </>
  );
};
export default Clinic;

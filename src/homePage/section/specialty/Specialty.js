import { useGetAllSpecialistQuery } from "../../../redux/SliceApi/specialistApi";
import SectionSpecialty from "./sectionSpecialty";

const Specialty = () => {
  const { data, error, isLoading } = useGetAllSpecialistQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error occurred!</p>;
  return (
    <>
      <SectionSpecialty dataSpecialist={data} />
    </>
  );
};
export default Specialty;

import SectionDoctor from "./sectionDoctor";
import { useGetTopDoctorQuery } from "../../../redux/SliceApi/doctorApiSlice";

const OutStandingDoctor = () => {
  const { data, error, isLoading } = useGetTopDoctorQuery(12);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error occurred!</p>;

  return (
    <>
      <SectionDoctor dataTopDoctor={data} />
    </>
  );
};
export default OutStandingDoctor;

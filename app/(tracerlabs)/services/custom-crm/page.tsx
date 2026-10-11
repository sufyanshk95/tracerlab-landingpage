import ServicePage, { serviceMetadata } from "../../../components/service/ServicePage";
import content from "./content";

export const metadata = serviceMetadata(content);

export default function Page() {
  return <ServicePage c={content} />;
}

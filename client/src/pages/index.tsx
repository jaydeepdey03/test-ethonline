import {Button} from "@/components/ui/button";
import useGlobalContextHook from "@/context/useGlobalContextHook";
import {Inter} from "next/font/google";
import {useState} from "react";

const inter = Inter({subsets: ["latin"]});

export default function Home() {
  const {client, SchemaId} = useGlobalContextHook();
  const data = {
    Name: "John Doe",
    Age: 30,
    Documents: ["aadhaar", "birth_certificate"],
    Height: 180,
    Weight: 75,
  };

  const [res, setRes] = useState<any>();

  const createAttestation = async () => {
    try {
      if (client !== undefined) {
        const createAttestationRes = await client.createAttestation({
          data: data,
          schemaId: SchemaId,
          indexingValue: "xxx",
        });

        console.log(createAttestationRes);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <Button onClick={createAttestation}>Create Attestation</Button>

        <div>{res && JSON.stringify(res, null, 2)}</div>
      </div>
    </div>
  );
}

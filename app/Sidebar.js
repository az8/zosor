import { Box } from "@mui/material";
import { useRouter } from 'next/navigation';


export default function Sidebar({currentExercise}) {

    const excerciseCount = 8;
    const router = useRouter();

    return (
        <Box sx={{overflow: "scroll"}}>
            {
                [...Array(excerciseCount).keys()].map(key =>
                <Box
                    key={key}
                    sx={{padding: "24px",
                        borderBottom: "1px solid #e7e7e7",
                        cursor: "pointer",
                        background: (key + 1)?.toString() == currentExercise?.toString() ? "#efeef4" : "",
                        "&:hover": {
                            background: "#e5e5e5"
                        }
                    }}
                    onClick={() => router.push(`/${key > 0 ? key + 1 : ""}`)}
                >
                        {key + 1}
                </Box>
                )
            }
        </Box>
    );
}

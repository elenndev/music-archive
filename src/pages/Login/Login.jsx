import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect, useState } from "react";
import supabase from "../../../auth"
import Button_SignOut from "../Dashboard/components/Button_SignOut";

export default function Login() {
    const [session, setSession] = useState(null);

    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session !== null) {
                setSession(session);
            }
        };
        getSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    if (!session) {
        return (
            <div
                style={{
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div>
                    <Auth
                        supabaseClient={supabase}
                        appearance={{ theme: ThemeSupa }}
                        providers={["google", "facebook", "github"]}
                    />
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <div>Logged in!</div>
                <Button_SignOut/>
            </div>
        );
    }
}

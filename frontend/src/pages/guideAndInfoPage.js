import React from 'react';
import {useTranslation} from "react-i18next";

import { LanguageContext } from "../App";

const GuideAndInfoPage = () => {
    const { t } = useTranslation();

    return (
        <div>
            {/*<div class="flex h-screen items-center justify-center">*/}
            {/*    <div class="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>*/}
            {/*</div>*/}
            <div className="antialiased text-gray-900">
                {/*<Head>*/}
                {/*    <title>Tailwind CSS Typography</title>*/}
                {/*</Head>*/}
                <div
                    className="px-4 py-10 max-w-3xl mx-auto sm:px-6 sm:py-12 lg:max-w-4xl lg:py-16 lg:px-8 xl:max-w-6xl">
                    <article className="prose lg:prose-xl">
                        <h1>{t("guide_title_1")} 🤔?</h1>
                        <p>
                            {t("guide_desc_1")}
                        </p>
                        <br></br>
                        <h1>{t("guide_title_2")} 💹?</h1>
                        <p>
                            {t("guide_desc_2")}
                        </p>
                        <br></br>
                        <h1>{t("guide_title_3")} 📉?</h1>
                        <ol>
                            <li>{t("guide_text_3.guide_text_3_1")} <a href="/forecast">{t("guide_text_3.guide_text_3_2")}</a></li>
                            <li>{t("guide_text_3.guide_text_3_3")}</li>
                            <li>{t("guide_text_3.guide_text_3_4")}</li>
                        </ol>
                        <br></br>
                    </article>
                </div>
            </div>
        </div>
    );
};

export default GuideAndInfoPage;

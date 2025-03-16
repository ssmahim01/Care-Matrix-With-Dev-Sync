import React from "react";
import Lottie from "lottie-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import faqLottie from "../../assets/faq.json";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";

const Faq = () => {
    const faqData = [
        {
            id: "q1",
            question: "How can I book an appointment?",
            answer: "You can book an appointment through our online portal or call our reception desk."
        },
        {
            id: "q2",
            question: "What are the visiting hours?",
            answer: "Visiting hours are from 10:00 AM to 8:00 PM. Special permissions may be required for ICU visits."
        },
        {
            id: "q3",
            question: "Do you accept health insurance?",
            answer: "Yes, we accept major health insurance providers. Please check with our billing department for details."
        },
        {
            id: "q4",
            question: "How do I get my medical records?",
            answer: "You can request your medical records through our patient portal or visit our records department."
        },
        {
            id: "q5",
            question: "What should I bring to my first appointment?",
            answer: "Please bring a valid ID, your insurance card, a list of current medications, and any relevant medical records or test results. If applicable, also bring a referral from your primary care physician."
        },
        {
            id: "q6",
            question: "What should I do in case of a medical emergency?",
            answer: "In case of a medical emergency, call 911 immediately or visit the nearest emergency room. For urgent but non-life-threatening situations, you can contact our urgent care center for assistance."
        },
        {
            id: "q7",
            question: "What services does Care Matrix offer?",
            answer: "Care Matrix provides a range of services including general consultations, emergency care, specialized treatments, diagnostic imaging, laboratory testing, physical therapy, and preventive health checkups. Visit our Services page for more details."
        }

    ];
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-[#EAF9FC] my-8 relative rounded-md">

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="container mx-auto  px-4 lg:px-8 "
            >
                <div className="flex flex-col md:flex-row items-center gap-8 py-10 xl:py-6">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-1/2"
                    >
                        <Lottie className="w-full  lg:w-10/12" animationData={faqLottie} loop />
                    </motion.div>


                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-1/2"
                    >
                        <h5 className="text-xs font-semibold text-[#0B55E5]">FREQUENTLY ASKED QUESTIONS</h5>
                        <h2 className="text-3xl lg:text-4xl font-bold  lg:text-left mb-6">Frequently Asked Questions <br className="hidden lg:flex" /> Guide Here</h2>
                        <Accordion type="single" collapsible>
                            {faqData.map(({ id, question, answer }) => (
                                <AccordionItem key={id} value={id}>
                                    <AccordionTrigger className={'cursor-pointer'}>{question}</AccordionTrigger>
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        whileInView={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.5, ease: "easeInOut", delay: 1 }}
                                        viewport={{ once: false, amount: 0.2 }}
                                    >
                                        <AccordionContent>{answer}</AccordionContent>
                                    </motion.div>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </motion.div>
                </div>
            </motion.div>

        </motion.div >
    );
};

export default Faq;

import React from 'react';
import { Form, Field } from 'react-final-form';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
    await sleep(300);
    window.alert(JSON.stringify(values, null, 2));
};

const validate = values => {
    const errors = {};
    if (!values.firstname) {
        errors.firstname = 'Required';
    }
    if (!values.lastname) {
        errors.lastname = 'Required';
    }
    if (!values.education) {
        errors.education = 'Required';
    }
    if (!values.preferredRole) {
        errors.preferredRole = 'Required';
    }
    return errors;
};

const FormComponent = () => {
    return (
        <div className="container mx-auto p-4">
            <Form
                onSubmit={onSubmit}
                validate={validate}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <>
                        <Card>
                            <CardHeader>
                                <CardTitle>Form</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit}>
                                    <div className="space-y-4">
                                        <Field name="firstname">
                                            {({ input, meta }) => (
                                                <div>
                                                    <Label htmlFor="firstname">First Name</Label>
                                                    <Input {...input} id="firstname" placeholder="Enter your first name" />
                                                    {meta.error && meta.touched && <span className="text-red-500">{meta.error}</span>}
                                                </div>
                                            )}
                                        </Field>

                                        <Field name="lastname">
                                            {({ input, meta }) => (
                                                <div>
                                                    <Label htmlFor="lastname">Last Name</Label>
                                                    <Input {...input} id="lastname" placeholder="Enter your last name" />
                                                    {meta.error && meta.touched && <span className="text-red-500">{meta.error}</span>}
                                                </div>
                                            )}
                                        </Field>

                                        <div className='flex justify-start items-center'>
                                            <Label className="p-0 my-0 mr-5">Employed Status</Label>
                                            <Field name="employed" type="checkbox">
                                                {({ input }) => (
                                                    <Switch
                                                        checked={input.checked}
                                                        onCheckedChange={(checked) => input.onChange(checked)}
                                                    />
                                                )}
                                            </Field>
                                        </div>

                                        <Field name="education">
                                            {({ input, meta }) => (
                                                <div>
                                                    <Label>Education</Label>
                                                    <Select onValueChange={input.onChange} defaultValue={input.value}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select education level" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="high_school">High School</SelectItem>
                                                            <SelectItem value="bachelors">Bachelor's</SelectItem>
                                                            <SelectItem value="masters">Master's</SelectItem>
                                                            <SelectItem value="doctorate">Doctorate</SelectItem>
                                                            <SelectItem value="other">Other</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    {meta.error && meta.touched && <span className="text-red-500">{meta.error}</span>}
                                                </div>
                                            )}
                                        </Field>

                                        <Field name="expertise" type="checkbox">
                                            {({ input }) => (
                                                <div>
                                                    <Label className='mb-2'>Expertise</Label>
                                                    <div className="grid grid-cols-3 gap-4">
                                                        {['HTML', 'CSS', 'Javascript', 'NodeJS', 'ReactJS'].map((skill) => (
                                                            <div key={skill} className="flex items-center space-x-2">
                                                                <Checkbox
                                                                    id={skill.toLowerCase()}
                                                                    checked={input.value?.includes(skill)}
                                                                    onCheckedChange={(checked) => {
                                                                        const newValue = input.value || [];
                                                                        if (checked) {
                                                                            input.onChange([...newValue, skill]);
                                                                        } else {
                                                                            input.onChange(newValue.filter(item => item !== skill));
                                                                        }
                                                                    }}
                                                                />
                                                                <Label htmlFor={skill.toLowerCase()}>{skill}</Label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </Field>

                                        <Field name="preferredRole" type="radio">
                                            {({ input, meta }) => (
                                                <div>
                                                    <Label>Preferred Role</Label>
                                                    <RadioGroup
                                                        onValueChange={input.onChange}
                                                        defaultValue={input.value}
                                                        className="flex flex-col space-y-2"
                                                    >
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="frontend" id="frontend" />
                                                            <Label htmlFor="frontend">Frontend Developer</Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="backend" id="backend" />
                                                            <Label htmlFor="backend">Backend Developer</Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="fullstack" id="fullstack" />
                                                            <Label htmlFor="fullstack">Full Stack Developer</Label>
                                                        </div>
                                                    </RadioGroup>
                                                    {meta.error && meta.touched && <span className="text-red-500">{meta.error}</span>}
                                                </div>
                                            )}
                                        </Field>

                                        <Field name="notes">
                                            {({ input }) => (
                                                <div>
                                                    <Label htmlFor="notes">Notes</Label>
                                                    <Textarea {...input} id="notes" placeholder="Enter your notes" />
                                                </div>
                                            )}
                                        </Field>

                                        <div className="flex space-x-2">
                                            <Button type="submit" disabled={submitting}>Submit</Button>
                                            <Button type="button" variant="outline" onClick={form.reset} disabled={submitting || pristine}>
                                                Reset
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                        <Card className="mt-4 rounded-xl bg-slate-100">
                            <CardHeader>
                                <CardTitle><p className='text-sm font-thin'>values</p></CardTitle>
                            </CardHeader>
                            <CardContent>
                                <pre>{JSON.stringify(values, null, 2)}</pre>
                            </CardContent>
                        </Card>
                    </>
                )}
            />
        </div>
    );
};

export default FormComponent;

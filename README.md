**1.**  **Pages Developed:**
    
    The following pages have been developed as part of the second assignment:
        
        1.  Landing page of the application: This page provides the category of the services which are being offered by the application.
        There are other options for the users like they can login, register, read the cutomer reviews and book the required services.
        The url for the landing page is mentioned below:
        
            https://bookmyservice.herokuapp.com/ 
            
        2. Login Page of the application: This page provides a user the option to login to the application using his email and password.The
        forgot password link has also been provided to the user which will give the message on the click that password has been emailed to him.
        The url for the login page is mentioned below:
        
            https://bookmyservice.herokuapp.com/Login
            
        3. Register Page: This page allows the user to  register for the website using his basic details.The user will get an alert that 
        registration is successful,if all the validations have been passed.The url for the registration page is mentioned below:
        
            https://bookmyservice.herokuapp.com/Register
            
        4. Book A Service Page: This page provides a form to the user to book any service like wedding planner,fitness services etc.The user
        will get an alert on booking a service successfully.The url of the booking a service page is mentioned below:
        
            https://bookmyservice.herokuapp.com/BookService
            
        5. Maintenance Page and Routing of the pages: On click of the pages/links which are under development user will be redirected to
        a page stating that the site is under maintenance.All the pages have been linked from the home page of the application.The url
        for the site under maintenance page is mentioned below:
        
            https://bookmyservice.herokuapp.com/UnderMaintenance

**2.**  **Libraries Used**

        The following libraries have been used to develop the application:
        
        1.  availity-reactstrap-validation
        2.  bootstrap
        3.  react
        4.  react-bootstrap
        5.  react-dom
        6.  react-router-bootstrap
        7.  react-router-dom
        8.  react-scripts
        9.  reactstrap
        10. reactstrap-validation
        
**3.**  **Coding References**

        1. Modified Code:
           
           <NavbarToggler onClick={this.toggle} />
           <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
                
           Reference Code:
           
           <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
            
            Reference:
            https://reactstrap.github.io/components/navbar/
            
            The reactstrap resource has been used to develop all the UI components of the application.
            Below is the link of all the components which has been created using that resource:
            
            https://reactstrap.github.io/components/alerts/
          
        2. Modified Code:
        
            <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/Home" component={Home} />
                <Route exact path="/Login" component={Login} />
      
        
           Reference Code:
           export default () =>
           <Switch>
            <Route path="/" exact component={Home} />
            </Switch>;
           
           Reference:
           https://serverless-stack.com/chapters/create-containers.html
           
        3. Modified Code:
           
          <AvForm row>
          <AvGroup>
          <FormGroup row>
          <Label for="email" sm={1}>Email:</Label>
          <Col sm={4}>
          <AvInput name="email" type="email" id="example" userName={this.state.userName} onChange={this.handleUserNameChange} placeholder="abc@xyz.com" required />
          <AvFeedback>Invalid Input!</AvFeedback>
          
          Reference Code:
          
          <AvGroup>
          <Label for="example">Rank</Label>
          <AvInput name="rank" id="example" required />
          <AvFeedback>This is an error!</AvFeedback>
          </AvGroup>
          
          Reference:
          https://availity.github.io/availity-reactstrap-validation/components/avform/
          
        4. Modified Code:
           <Col sm={4}>
            <AvInput name="email" type="email" id="example" userName={this.state.userName} onChange={this.handleUserNameChange} placeholder="abc@xyz.com" required />
            <AvFeedback>Invalid Input!</AvFeedback>
            </Col>
        
          Reference Code:
            handleChange(event) {
            this.setState({ value: event.target.value })
            }

            render() {
            return (
            <form>
            <input
                type="text"
                value={this.state.username}
            onChange={this.handleChange}
            />
            </form>
            
          Reference:
          https://flaviocopes.com/react-forms/
          
          5. (n.d.). Retrieved from https://www.google.com/search?q=spanner image icon&tbm=isch&source=univ&client=firefox-b-d&sa=X&ved=2ahUKEwiTve_2zMbiAhXsRd8KHWTVCJ8QsAR6BAgGEAE&biw=1280&bih=607#imgrc=OtwX9B5a1sLksM:
          
          6. (n.d.). Retrieved from https://www.google.com/search?q=fitness icon png&client=firefox-b-d&tbm=isch&tbs=rimg:Ca-MC6v8GNDXIjhuLMnRAbF2hFwRf0NxZIgk-502s-ljgkxPTU2gvM55k4HIUJ0uTBjiIiU-fvRpHef-cT0Atj5VeioSCW4sydEBsXaEEQLh5tMgIiVmKhIJXBF_1Q3FkiCQRycx3aw_1Acm4qEgn7nTaz6WOCTBG2m29gddzz_1SoSCU9NTaC8znmTEQnsCs0aV5uuKhIJgchQnS5MGOIR2lERfwMEjS8qEgkiJT5-9Gkd5xHXBlgH5DwtdyoSCf5xPQC2PlV6EQ-bh1SNcSPu&tbo=u&sa=X&ved=2ahUKEwidre2Bz8biAhVoj1QKHSw9BcQQ9C96BAgBEBs&biw=1280&bih=607&dpr=1.5#imgrc=XBF_Q3FkiCTbEM:
          
          7. (n.d.). Retrieved from https://www.google.com/search?q=cleaning services icon&client=firefox-b-d&tbm=isch&source=iu&ictx=1&fir=kijd_De2n-rmiM:,YZo9u-DifufDJM,_&vet=1&usg=AI4_-kTzJBfaNQvPBsnRbp9Zzgo3VxGvgQ&sa=X&ved=2ahUKEwiw8Mm00MbiAhWGmuAKHWGRDeEQ9QEwCXoECAYQFg#imgrc=kijd_De2n-rmiM:
          
          8. (n.d.). Retrieved from https://www.google.com/search?q=wedding services icon&client=firefox-b-d&tbm=isch&source=iu&ictx=1&fir=iMRnzMhgIQcHbM:,i1cyk6_0OeAu0M,_&vet=1&usg=AI4_-kQddqD_Pxi9mI_n5fmTYyOMSJ5p_Q&sa=X&ved=2ahUKEwijsM6X0cbiAhXGdd8KHb7OCRQQ9QEwAHoECAcQBA#imgrc=iMRnzMhgIQcHbM:
          
          9. (n.d.). Retrieved from https://www.google.com/search?q=packers and movers icon&client=firefox-b-d&tbm=isch&source=iu&ictx=1&fir=6OasVZqjPizhPM:,fttaH9mTthRKQM,_&vet=1&usg=AI4_-kSPqEi1EliTHXZidWuyEhGhFeefuw&sa=X&ved=2ahUKEwidrpbv0cbiAhXGg-AKHXDNDiMQ9QEwBXoECAcQDg#imgrc=aa3iAZwTy0Pd_M:&vet=1
          
          10. (n.d.). Retrieved from https://www.google.com/search?q=tutors icon&tbm=isch&source=univ&client=firefox-b-d&sa=X&ved=2ahUKEwjah5e60sbiAhVjneAKHUU0DHsQsAR6BAgHEAE&biw=1280&bih=607#imgrc=NPwagK9z4BtgFM:
          
          11. 41 Neat Cleaning Business Slogans. (2018, July 11). Retrieved from https://www.logoorbit.com/industry/cleaning-services/cleaning-business-slogans
          
          12. (n.d.). Retrieved from https://www.google.com/search?q=your child's future begin here slogan&tbm=isch&source=univ&client=firefox-b-d&sa=X&ved=2ahUKEwjljfu918niAhWSmuAKHSmpAjYQsAR6BAgFEAE&biw=1280&bih=607#imgrc=hpGPQjTkLaIRlM:
          
          13. Tutorialspoint.com. (n.d.). ReactJS Tutorial. Retrieved from https://www.tutorialspoint.com/reactjs/
          

**4.** **Repository Link:** 
   https://git.cs.dal.ca/singh2/a2_manpreet_singh
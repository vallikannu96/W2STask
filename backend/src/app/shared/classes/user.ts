
export class User {
    public id?: number = 0;
    public name?: string = '';
    public email?: string = '';
    public first_name?: string = '';
    public last_name?: string = '';
    public roles?: Array<string> = [];
    public accesses?: Array<string> = [];
    public user_type?: string = null;
    public mobile?: string = '';
    public is_active?: boolean = false;
    public profile_img?: string = null;
    public system_admin?: boolean = false;
    public country_code?: string = '';
    public is_superuser?: boolean = false;
    public mobile_number?: string = '';
    public dob?: string = '';
    public gender?: string = '';
    public optional_email?: string = '';
    public optional_mobile?: string = '';
    public contacts?: Array<Object> = [];



    constructor(data?: Object) {
        if (data) {
            this.id = data['id'] || this.id;
            this.name = data['name'] || this.name;
            this.email = data['email'] || this.email;
            this.first_name = data['first_name'] || this.first_name;
            this.last_name = data['last_name'] || this.last_name;
            this.roles = data['roles'] || this.roles;
            this.accesses = data['accesses'] || this.accesses;
            this.user_type = data['user_type'] || this.user_type;
            this.mobile = data['mobile'] || this.mobile;
            this.is_active = data['is_active'] || this.is_active;
            this.profile_img = data['profile_image'] || this.profile_img;
            this.system_admin = data['system_admin'] || this.system_admin;
            this.is_superuser = data['is_superuser'] || this.is_superuser;
            this.country_code = data['country_code'] || this.country_code;
            this.mobile_number = data['mobile_number'] || this.mobile_number;
            this.dob = data['dob'] || this.dob;
            this.gender = data['gender'] || this.gender;
            this.optional_email = data['optional_email'] || this.optional_email;
            this.optional_mobile = data['optional_mobile'] || this.optional_mobile;    
            this.contacts = data['contacts'] || this.contacts;          
        }
    }
}
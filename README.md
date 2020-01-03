# README

<<<<<<< Updated upstream
This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
=======
## usersテーブル(登録した人の情報を管理するテーブル)
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|username|string|null: false|
|user_id|integer|null: false,|
### Association
- has_many :posts
- has_many :groups,  
- has_many :group_users table  thorough:  group_users table


## postsテーブル(投稿を管理するテーブル)
|Column|Type|Options|
|------|----|-------|
|image|null: false|
|text|text|null: false|
|user_id|integer|null: false,|
### Association
- belongs_to :users
- belongs_to :groups


## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group-name|text|null: false|
|chatmember|integer|null: false, |
|group_id|integer|null: false, |
### Association
- has_many :users  
- has_many :group_users table  thorough:  group_users table
- has_many :posts



## group_users table
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false|
|group_id|integer|null: false, |
### Association
- has_many :users  
- has_many :groups  
>>>>>>> Stashed changes
